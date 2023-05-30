const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Goal = require('../models/progModel');
const nodemailer = require("nodemailer");
const Cryptr = require('cryptr');


const cryptr = new Cryptr(process.env.CRYPTR);


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, img } = req.body

    if (!name || !email || !password) {
        res.status(400).json({
            message: "Please add all fields"
        })
    }

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User arleady exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)



    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        refresh: '',
        img,
    })

    if (user) {

        let transporter = nodemailer.createTransport({
            host: "smtp.yandex.ru",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_USER_PASSWORD,
            },
        });

        // send mail with defined transport object
        let message = {
            from: process.env.EMAIL_USER, // sender address
            to: email, // list of receivers
            subject: 'Вы успешно зарегистрировались в сервисе "Notif" ', // Subject line
            text: `Вы видите это письмо, потому на вашу почту был зарегистрирован аккаунт`, // plain text body
        };
        transporter.sendMail(message);

        res.status(201).json({
            _id: user.id,
            //Access_Token: generateAccessToken(user._id),
            //Refresh_Token: refresh,
        })
        //user.refresh = refresh
        //await user.save();
    } else {
        res.status(400).json({
            message: "Invalid user data"
        });
        //throw new Error('Invalid user data')
    }

})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password, auth } = req.body


    const user = await User.findOne({ email })


    if (user && (await bcrypt.compare(password, user.password))) {
        const userr = user

        jwt.verify(user.refresh, process.env.JWT_SECRET_REFRESH, (err, user) => {
            if (!err && auth != undefined) {

                return res.status(200).json({
                    id: userr.id,
                    name: userr.name,
                    Access_Token: generateAccessToken(userr.id),
                    Refresh_Token: userr.refresh,
                })
            } else {
                const numb = Math.floor(Math.random(10000) * 100000);
                User.findOneAndUpdate({ _id: userr._id }, { code: numb }, { upsert: true }, function (err, doc) {
                    if (err) {
                        res.status(500).json({
                            message: "err"
                        });
                    } else {
                        let transporter = nodemailer.createTransport({
                            host: "smtp.yandex.ru",
                            port: 465,
                            secure: true, // true for 465, false for other ports
                            auth: {
                                user: process.env.EMAIL_USER,
                                pass: process.env.EMAIL_USER_PASSWORD,
                            },
                        });

                        // send mail with defined transport object
                        let message = {
                            from: process.env.EMAIL_USER, // sender address
                            to: userr.email, // list of receivers
                            subject: "В ваш аккаунт пытаются войти с нового устройства", // Subject line
                            text: `Ваш код для входа -> "${numb}" . Если это были не вы, то срочно смените пароль!`, // plain text body
                        };
                        transporter.sendMail(message).then((info) => {
                            return res.status(201)
                                .json({
                                    id: userr.id,
                                    message: "new add",
                                    Access_Token: generateAccessToken(userr.id),
                                })
                        })
                    }
                })


            }
        })



    } else {
        res.status(400).json({
            message: `Invalid credentials`
        })
    }
})

const getMe = asyncHandler(async (req, res) => {
    const { name, _id, email, img, git, vk } = await User.findById(req.user.id);

    res.status(200).json({
        name,
        id: _id,
        email,
        img,
        git,
        vk
    });
})


const getUserAkk = asyncHandler(async (req, res) => {
    const { id } = req.body
    const { name, img, git, vk } = await User.findById(id);
    const goals = await Goal.find({ user: id })

    for (let i = 0; i < goals.length; i++) {
        goals[i].text = cryptr.decrypt(goals[i].text)
        goals[i].title = cryptr.decrypt(goals[i].title)
    }

    res.status(200).json({
        name,
        img,
        goals,
        git,
        vk
    });
})


const getMeSer = asyncHandler(async (req, res) => {
    const { acc, id, rf } = req.body

    jwt.verify(rf, process.env.JWT_SECRET_REFRESH, async (err, user) => {
        jwt.verify(acc.split(' ')[1], process.env.JWT_SECRET_ACCESS, async (err, user1) => {
            if (user.id == user1.id && user.id == id) {
                const rest = await User.findById(user.id);
                if (rest.refresh == rf) {
                    const access = generateAccessToken(user.id);
                    res.status(200).json({
                        id: rest._id,
                        name: rest.name,
                        refresh: rest.refresh,
                        access: access
                    })
                }

            } else {
                res.status(400).json({
                    message: 'error'
                })
            }

        })

        // if (!err) {
        //     const rest = await User.findById(user.id);
        //     if (rest !== null) {
        //         const { refresh } = await User.findById(user.id);
        //         if (refreshToken.split('.')[2] == refresh.split('.')[2]) {
        //             const access = generateAccessToken(user.id);
        //             return res.status(201).json({ access })
        //         }
        //         return res.status(405).json({ message: "Token invalid", err: err })

        //     } else if (rest === null) {
        //         return res.status(405).json({ message: "User not found" })
        //     }

        // } else {
        //     return res.status(405).json({ message: "User not authenticated", err: err })
        // }
    })

})


const renewAccessToken = asyncHandler(async (req, res) => {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {

        return res.status(405).json({ message: "User not authenticated" })
    }

    jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH, async (err, user) => {

        if (!err) {
            const rest = await User.findById(user.id);
            if (rest !== null) {
                const { refresh } = await User.findById(user.id);
                if (refreshToken.split('.')[2] == refresh.split('.')[2]) {
                    const access = generateAccessToken(user.id);
                    return res.status(201).json({ access })
                }
                return res.status(405).json({ message: "Token invalid", err: err })

            } else if (rest === null) {
                return res.status(405).json({ message: "User not found" })
            }

        } else {
            return res.status(405).json({ message: "User not authenticated", err: err })
        }
    })
})




const newEmail = asyncHandler(async (req, res) => {
    const { email } = req.body

    if (!email) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const userr = await User.findOne({ email })


    if (!userr) {
        res.status(400)
        throw new Error('User with given does not exist')
    }

    const rand = generateAccessTokenResPass(email);
    const link = `https://client-vert-xi.vercel.app/newEmailEm/${userr._id}/${rand}`


    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.yandex.ru",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_USER_PASSWORD,
        },
    });

    // send mail with defined transport object
    let message = {
        from: process.env.EMAIL_USER, // sender address
        to: userr.email, // list of receivers
        subject: "Изменение почты", // Subject line
        text: `Перейдите по ссылке, чтобы изменить почту -> ${link}`, // plain text body
    };
    transporter.sendMail(message).then((info) => {
        return res.status(201)
            .json({
                message: "OK",
                rand: rand,
            })
    })

})

const newEmailEm = asyncHandler(async (req, res) => {
    const { id, token, email } = req.body


    const user = await User.findById(id);


    if (user) {

        jwt.verify(token, process.env.JWT_SECRET_ACCESS_REST_PASS, async (err, user) => {
            if (!err) {

                User.findOneAndUpdate({ _id: id }, { email: email }, { upsert: true }, function (err, doc) {
                    if (err) return console.log(500, { error: err });
                    let transporter = nodemailer.createTransport({
                        host: "smtp.yandex.ru",
                        port: 465,
                        secure: true, // true for 465, false for other ports
                        auth: {
                            user: process.env.EMAIL_USER,
                            pass: process.env.EMAIL_USER_PASSWORD,
                        },
                    });

                    // send mail with defined transport object
                    let message = {
                        from: process.env.EMAIL_USER, // sender address
                        to: user.email, // list of receivers
                        subject: "Вы успешно изменили почту", // Subject line
                        text: `Вы видите это письмо, потому что почта учётной записи была изменена.`, // plain text body
                    };
                    transporter.sendMail(message).then((info) => {
                        return res.status(201)
                            .json({
                                message: "OK",
                            })
                    })
                });
            } else {
                res.status(400).json({
                    message: 'Срок смены почты истёк'
                })
            }
        })

    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})
















const newName = asyncHandler(async (req, res) => {
    const { email } = req.body

    if (!email) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const userr = await User.findOne({ email })


    if (!userr) {
        res.status(400)
        throw new Error('User with given does not exist')
    }

    const rand = generateAccessTokenResPass(email);
    const link = `https://client-vert-xi.vercel.app/newNameEm/${userr._id}/${rand}`


    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.yandex.ru",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_USER_PASSWORD,
        },
    });

    // send mail with defined transport object
    let message = {
        from: process.env.EMAIL_USER, // sender address
        to: userr.email, // list of receivers
        subject: "Изменение имени", // Subject line
        text: `Перейдите по ссылке, чтобы изменить имя -> ${link}`, // plain text body
    };
    transporter.sendMail(message).then((info) => {
        return res.status(201)
            .json({
                message: "OK",
                rand: rand,
            })
    })

})


const newNameEm = asyncHandler(async (req, res) => {
    const { id, token, name } = req.body


    const user = await User.findById(id);


    if (user) {

        jwt.verify(token, process.env.JWT_SECRET_ACCESS_REST_PASS, async (err, user) => {
            if (!err) {

                User.findOneAndUpdate({ _id: id }, { name: name }, { upsert: true }, function (err, doc) {
                    if (err) return console.log(500, { error: err });
                    let transporter = nodemailer.createTransport({
                        host: "smtp.yandex.ru",
                        port: 465,
                        secure: true, // true for 465, false for other ports
                        auth: {
                            user: process.env.EMAIL_USER,
                            pass: process.env.EMAIL_USER_PASSWORD,
                        },
                    });

                    // send mail with defined transport object
                    let message = {
                        from: process.env.EMAIL_USER, // sender address
                        to: user.email, // list of receivers
                        subject: "Вы успешно изменили имя", // Subject line
                        text: `Вы видите это письмо, потому что имя учётной записи было изменено.`, // plain text body
                    };
                    transporter.sendMail(message).then((info) => {
                        return res.status(201)
                            .json({
                                message: "OK",
                                name: name
                            })
                    })
                });
            } else {
                return res.status(400).json({
                    message: 'Срок смены имени истёк'
                })
            }
        })

    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})


const newPhMan = asyncHandler(async (req, res) => {
    const { newPh, id } = req.body


    const user = await User.findById(id);


    if (user) {
        User.findOneAndUpdate({ _id: id }, { img: newPh }, { upsert: true }, function (err, doc) {
            if (err) return console.log(500, { error: err });
            Goal.updateMany({ user: id }, { avatar: newPh }, function (err, doc) {
                if (err) return console.log(500, { error: err });
                let transporter = nodemailer.createTransport({
                    host: "smtp.yandex.ru",
                    port: 465,
                    secure: true, // true for 465, false for other ports
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_USER_PASSWORD,
                    },
                });

                // send mail with defined transport object
                let message = {
                    from: process.env.EMAIL_USER, // sender address
                    to: user.email, // list of receivers
                    subject: "Вы успешно изменили фотографию", // Subject line
                    text: `Вы видите это письмо, потому что фотография учётной записи была изменена.`, // plain text body
                };
                transporter.sendMail(message).then((info) => {
                    return res.status(201)
                        .json({
                            message: "OK",
                        })
                })
            })
        });
    } else {
        res.status(400).json({
            message: 'Аккаунт не найден'
        })
    }
})










const restPass = asyncHandler(async (req, res) => {
    const { email } = req.body

    if (!email) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const userr = await User.findOne({ email })


    if (!userr) {
        res.status(400)
        throw new Error('User with given does not exist')
    }

    const rand = generateAccessTokenResPass(email);
    const link = `https://client-vert-xi.vercel.app/resetPassEm/${userr._id}/${rand}`


    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.yandex.ru",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_USER_PASSWORD,
        },
    });

    // send mail with defined transport object
    let message = {
        from: process.env.EMAIL_USER, // sender address
        to: userr.email, // list of receivers
        subject: "Восстановление пароля", // Subject line
        text: `Перейдите по ссылке, чтобы восстановить пароль -> ${link}`, // plain text body
    };
    transporter.sendMail(message).then((info) => {
        return res.status(201)
            .json({
                message: "OK",
                rand: rand,
            })
    })

})


const restPassEm = asyncHandler(async (req, res) => {
    const { id, token, password } = req.body


    const user = await User.findById(id);


    if (user) {

        jwt.verify(token, process.env.JWT_SECRET_ACCESS_REST_PASS, async (err, user) => {
            if (!err) {
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(password, salt)
                const refreshToken = generateRefreshToken(id);
                User.findOneAndUpdate({ _id: id }, { password: hashedPassword, refresh: refreshToken }, { upsert: true }, function (err, doc) {
                    if (err) return console.log(500, { error: err });
                    let transporter = nodemailer.createTransport({
                        host: "smtp.yandex.ru",
                        port: 465,
                        secure: true, // true for 465, false for other ports
                        auth: {
                            user: process.env.EMAIL_USER,
                            pass: process.env.EMAIL_USER_PASSWORD,
                        },
                    });

                    // send mail with defined transport object
                    let message = {
                        from: process.env.EMAIL_USER, // sender address
                        to: user.email, // list of receivers
                        subject: "Вы успешно восстановили пароль", // Subject line
                        text: `Вы видите это письмо, потому что пароль к учётной записи был изменён.`, // plain text body
                    };
                    transporter.sendMail(message).then((info) => {
                        return res.status(201)
                            .json({
                                message: "OK",
                            })
                    })
                });
            } else {
                res.status(400).json({
                    message: 'Срок смены пароля истёк. Повторите попытку'
                })
            }
        })

    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})


const deleteAkk = asyncHandler(async (req, res) => {
    const { id, email, password } = req.body

    const user = await User.findById(id);
    if (email === user.email) {
        bcrypt.compare(password, user.password).then((rest) => {
            if (rest) {
                const rand = generateAccessTokenResPass(user.email);
                const link = `https://client-vert-xi.vercel.app/deleteAkkEm/${id}/${rand}`


                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    host: "smtp.yandex.ru",
                    port: 465,
                    secure: true, // true for 465, false for other ports
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_USER_PASSWORD,
                    },
                });

                // send mail with defined transport object
                let message = {
                    from: process.env.EMAIL_USER, // sender address
                    to: user.email, // list of receivers
                    subject: "Удаление аккаунта", // Subject line
                    text: `Перейдите по ссылке, чтобы удалить аккаунт -> ${link} . Если это были не вы, то срочно поменяйте пароль своей учётной записи!`, // plain text body
                };
                transporter.sendMail(message).then((info) => {
                    return res.status(201)
                        .json({
                            message: "OK",
                        })
                })
            } else {
                return res.status(400).json({
                    message: 'Invalid credentials'
                })
            }
        })




    } else if (!bcrypt.compare(password, user.password) || email !== user.email) {
        return res.status(400).json({
            message: 'Invalid credentials'
        })
    }



})


const deleteAkkEm = asyncHandler(async (req, res) => {
    const { id, rand, email } = req.body


    const user = await User.findById(id);

    if (email === user.email) {
        jwt.verify(rand, process.env.JWT_SECRET_ACCESS_REST_PASS, async (err, user) => {

            if (!err) {
                const doc = await User.findById(id)
                try {
                    doc.remove(async (info) => {
                        let transporter = nodemailer.createTransport({
                            host: "smtp.yandex.ru",
                            port: 465,
                            secure: true, // true for 465, false for other ports
                            auth: {
                                user: process.env.EMAIL_USER,
                                pass: process.env.EMAIL_USER_PASSWORD,
                            },
                        });

                        // send mail with defined transport object
                        let message = {
                            from: process.env.EMAIL_USER, // sender address
                            to: email, // list of receivers
                            subject: "Вы успешно удалили аккаунт", // Subject line
                            text: `Ваша учётная запись бала успешно удалена!`, // plain text body
                        };
                        transporter.sendMail(message).then((info) => {
                            return res.status(201)
                                .json({
                                    message: "Аккаунт удалён",
                                })
                        })
                    })
                } catch {
                    res.status(400).json({
                        message: 'Не удалось удалить аккаунт'
                    })
                }

            } else {
                res.status(400).json({
                    message: "Срок удаления учётной записи истёк. Повторите попытку "
                })
            };

        })
    }
})


const cod = asyncHandler(async (req, res) => {

    const { id, cod } = req.body

    const user = await User.findById(id);

    if (String(cod) === user.code) {
        const { refresh } = await User.findById(id);

        jwt.verify(refresh, process.env.JWT_SECRET_REFRESH, (err, wf) => {

            if (!err) {
                return res.status(201)
                    .json({
                        message: "OK",
                        id: user._id,
                        name: user.name,
                        Access_Token: generateAccessToken(user._id),
                        Refresh_Token: refresh,
                    })

            } else {
                const refresh = generateRefreshToken(user._id);
                User.findOneAndUpdate({ _id: user._id }, { refresh: refresh }, { upsert: true }, function (err, doc) {
                    if (err) return console.log(500, { error: err });
                    console.log('Succesfully saved.');
                });
                let transporter = nodemailer.createTransport({
                    host: "smtp.yandex.ru",
                    port: 465,
                    secure: true, // true for 465, false for other ports
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_USER_PASSWORD,
                    },
                });

                // send mail with defined transport object
                let message = {
                    from: process.env.EMAIL_USER, // sender address
                    to: user.email, // list of receivers
                    subject: "Вход в аккаунт", // Subject line
                    text: `В ваш аккаунт вошли с нового устройства. Если это были не вы, то срочно поменяйте пароль!`, // plain text body
                };
                transporter.sendMail(message).then((info) => {
                    return res.status(201)
                        .json({
                            message: "OK",
                            id: user._id,
                            name: user.name,
                            Access_Token: generateAccessToken(user._id),
                            Refresh_Token: refresh,
                        })
                })
            }
        })





    }
})



const setGitVk = asyncHandler(async (req, res) => {

    const { id } = req.user
    const { git, vk } = req.body

    const user = await User.findById(id);

    User.findOneAndUpdate({ _id: user._id }, { vk: vk, git: git }, { upsert: true }, function (err, doc) {
        if (err) return console.log(500, { error: err });
        console.log('Succesfully saved.');
    });
    let transporter = nodemailer.createTransport({
        host: "smtp.yandex.ru",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_USER_PASSWORD,
        },
    });

    // send mail with defined transport object
    let message = {
        from: process.env.EMAIL_USER, // sender address
        to: user.email, // list of receivers
        subject: "Изменение ссылок на GIT или ВК", // Subject line
        text: `Вы видите это письмо, потому что у вашего аккаунта изменились ссылки на GIT или ВК`, // plain text body
    };
    transporter.sendMail(message).then((info) => {
        return res.status(201)
            .json({
                message: "OK",
            })
    })
})







const generateAccessToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_ACCESS, {
        expiresIn: '10m',
    })
}

const generateAccessTokenResPass = (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET_ACCESS_REST_PASS, {
        expiresIn: '10m',
    })
}


const generateRefreshToken = (id) => {
    const refresh = jwt.sign({ id }, process.env.JWT_SECRET_REFRESH, {
        expiresIn: '30d',
    })

    return refresh;

}




module.exports = {
    registerUser,
    loginUser,
    getMe,
    getMeSer,
    renewAccessToken,
    restPass,
    restPassEm,
    deleteAkk,
    deleteAkkEm,
    cod,
    newName,
    newNameEm,
    newPhMan,
    newEmail,
    newEmailEm,
    getUserAkk,
    setGitVk
}