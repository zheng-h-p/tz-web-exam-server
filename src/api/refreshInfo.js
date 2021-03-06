const fs = require("fs")
const path = require("path")
const {UserTable} = require("../db/api/tables")
async function refreshInfo(req, res) {

  let {nickname, sex, avatarPath} = req.body
  console.log({nickname, sex, avatarPath})
  // res.send({nickname, sex, avatarPath})


  // 直接存base64
  await UserTable.updateOne(
    {token:req.cookies.token},
    {$set:{nickname, sex, avatarPath}})
  avatarPath = avatarPath.replace(/\+/g, "%2B");
  avatarPath = avatarPath.replace(/\&/g, "%26");
  res.send({
    code: 0,
    msg: "更新成功",
    data: {
      userInfo: {
        nickname, sex, avatarPath
      }
    }
  })



  //base64转图片的版本
  // if(avatarPath.length > 100){
  //   // 后缀
  //   let extra = /^data:image\/(?<extra>\w+?);base64,/.exec(avatarPath).groups.extra
  //   let base64 = avatarPath.replace(/^data:image\/\w+?;base64,/, "")
  //   const buffer = Buffer.from(base64, 'base64')
  //   let targetPath = path.resolve(__dirname, '../../uploads/avatar')
  //   let filename = new Date().valueOf()
  //   fs.writeFileSync(`${targetPath}/${filename}.${extra}`, buffer)
  //   const realPath = `http://47.104.155.140/avatar/${filename}.${extra}`
  //   await UserTable.updateOne(
  //     {token:req.cookies.token},
  //     {$set:{nickname, sex, avatarPath: realPath}})
  //   res.send({
  //     code: 0,
  //     msg: "更新成功",
  //     data: {
  //       userInfo: {
  //         nickname, sex, avatarPath: realPath
  //       }
  //     }
  //   })
  // }else{
  //   await UserTable.updateOne(
  //     {token:req.cookies.token},
  //     {$set:{nickname, sex}},
  //     )
  //   res.send({
  //     code: 0,
  //     msg: "更新成功",
  //     data: {
  //       userInfo: {
  //         nickname, sex
  //       }
  //     }
  //   })
  // }
}

module.exports = refreshInfo
