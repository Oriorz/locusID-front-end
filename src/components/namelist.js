const { default: Home } = require("./screens/Home")

module.exports = {
  readme: "socialss naming need to change, socials is actual the id of all socialss",
  socials_list: [
    "facebook",
    "whatsapp",
    "telegram",
    "linkedin",
    "line",
    "skype",
    "twitter",
    "wechat",
    "instagram",
    "foursquare",
    "xiaohongshu",
    "reddit"
  ],
  state_false: {
    name: false,
    notes: false,
    nickname: false,
    title: false,
    role: false,
    organization: false,
    workemail: false,
    phone: false,
    homephone: false,
    workphone: false,
    homefax: false,
    workfax: false,
    url:false,
    workurl:false,
    birthday:false,
    address:false,
    workaddress:false,
    facebook: false,
    whatsapp: false,
    telegram: false,
    linkedin: false,
    line: false,
    skype: false,
    twitter: false,
    wechat: false,
    instagram: false,
    foursquare: false,
    xiaohongshu: false,
    reddit: false
  },
  state_true: {
    name: true,
    notes: true,
    nickname: true,
    title: true,
    role: true,
    organization: true,
    workemail: true,
    phone: true,
    homephone: true,
    workphone: true,
    homefax: true,
    workfax: true,
    url:true,
    workurl:true,
    birthday:true,
    address:true,
    workaddress:true,
    facebook: true,
    whatsapp: true,
    telegram: true,
    linkedin: true,
    line: true,
    skype: true,
    twitter: true,
    wechat: true,
    instagram: true,
    foursquare: true,
    xiaohongshu: true,
    reddit: true
  },
  messaging: [
    "whatsapp",
    "wechat",
    "line",
    "telegram",
  ],
  socials: [
    {
      id: "facebook",
      title: "Facebook",
      src: "../images/facebook.png",
      example: "www.facebook.com/itap.3",
      link: "https://www.facebook.com/",
      shortlink: "www.facebook.com/",
      vcard: "Facebook"
    },
    {
      id: "whatsapp",
      title: "Whatsapp Messenger",
      src: "../images/whatsapp.png",
      example: "601112345678",
      link: "https://api.whatsapp.com/send?phone=",
      shortlink: "api.whatsapp.com/send?phone=",
      vcard: "WhatsappMessenger"
    },
    {
      id: "instagram",
      title: "Instagram",
      src: "../images/instagram.png",
      example: "https://www.instagram.com/vipbakeryshop/",
      link: "https://www.instagram.com/",
      shortlink: "www.instagram.com/",
      vcard: "Instagram"
    },
    {
      id: "twitter",
      title: "Twitter",
      src: "../images/twitter.png",
      example: "https://www.twitter.com/@loh_meng",
      link: "https://www.twitter.com/",
      shortlink: "www.twitter.com/",
      vcard: "Twitter"
    },
    {
      id: "telegram",
      title: "Telegram Messenger",
      src: "../images/telegram.png",
      example: "https://t.me/Oriorz",
      link: "https://t.me/",
      shortlink: "t.me/",
      vcard: "TelegramMessenger"
    },
    {
      id: "linkedin",
      title: "Linkedin",
      src: "../images/linkedin.png",
      example: "https://www.linkedin.com/in/chee-meng-loh-17b929256",
      link: "https://www.linkedin.com/in/",
      shortlink: "www.linkedin.com/in/",
      vcard: "Linkedin"
    },
    {
      id: "line",
      title: "Line",
      src: "../images/line.png",
      example: "https://line.me/R/ti/p/@linedevelopers",
      link: "https://line.me/R/ti/p/",
      shortlink: "line.me/R/ti/p/",
      vcard: "Line"
    },
    {
      id: "skype",
      title: "Skype",
      src: "../images/skype.png",
      example: "...",
      link: "https://www.facebook.com/",
      shortlink: "www.facebook.com/",
      vcard: "Skype"
    },
    {
      id: "wechat",
      title: "Wechat",
      src: "../images/wechat.png",
      example: "weixin://dl/chat?miaomiao",
      link: "weixin://dl/chat?",
      shortlink: "weixin://dl/chat?",
      vcard: "Wechat"
    },
    {
      id: "foursquare",
      title: "Foursquare",
      src: "../images/foursquare.png",
      example: "...",
      link: "https://www.facebook.com/",
      shortlink: "www.facebook.com/",
      vcard: "Foursquare"
    },
    {
      id: "xiaohongshu",
      title: "小红书",
      src: "../images/xiaohongshu.png",
      example: "...",
      link: "https://www.facebook.com/",
      shortlink: "www.facebook.com/",
      vcard: "xiaohongshu"
    },
    {
      id: "reddit",
      title: "Reddit",
      src: "../images/reddit.png",
      example: "...",
      link: "https://www.facebook.com/",
      shortlink: "www.facebook.com/",
      vcard: "Reddit"
    }
  ],
  bios: [
    {
      id: "name",
      title: "Name",
      src: "../images/name.jpg",
      example: "...",
      vcard: "Name"
    },
    {
      id: "nickname",
      title: "NickName (Optional)",
      src: "../images/name.jpg",
      example: "...",
      vcard: "NickName"
    },
    {
      id: "workemail",
      title: "Work Email (Optional)",
      src: "../images/email.png",
      example: "...",
      vcard: "work-email"
    },
    {
      id: "title",
      title: "Title (Optional)",
      src: "../images/title.jpg",
      example: "...",
      vcard: "Title"
    },
    /* {
      id: "role",
      title: "Role (Optional)",
      src: "../images/title.jpg",
      example: "...",
      vcard: "Role"
    }, */
    {
      id: "organization",
      title: "Organization (Optional)",
      src: "../images/title.jpg",
      example: "...",
      vcard: "Organization"
    },
    {
      id: "phone",
      title: "Handphone",
      src: "../images/phone.png",
      example: "...",
      vcard: "phone"
    },
    {
      id: "homephone",
      title: "Home Phone (Optional)",
      src: "../images/phone.png",
      example: "...",
      vcard: "home"
    },
    {
      id: "workphone",
      title: "Work Phone (Optional)",
      src: "../images/phone.png",
      example: "...",
      vcard: "Work"
    },
    {
      id: "homefax",
      title: "Home Fax (Optional)",
      src: "../images/fax.jpg",
      example: "...",
      vcard: "homefax"
    },
    {
      id: "workfax",
      title: "Work Fax (Optional)",
      src: "../images/fax.jpg",
      example: "...",
      vcard: "workfax"
    },
    {
      id: "url",
      title: "Personal Website",
      src: "../images/website.jpg",
      example: "...",
      vcard: "url"
    },
    {
      id: "workurl",
      title: "Office Website",
      src: "../images/website.jpg",
      example: "...",
      vcard: "workurl"
    },
    {
      id: "birthday",
      title: "Birthday (optional)",
      src: "../images/birthday.jpg",
      example: "...",
      vcard: "birthday"
    },
    {
      id: "address",
      title: "Address (optional)",
      src: "../images/address.jpg",
      example: "...",
      vcard: "address"
    },
    {
      id: "workaddress",
      title: "Work Address (optional)",
      src: "../images/address.jpg",
      example: "...",
      vcard: "workaddress"
    },
  ],
  sales: [
    "grab",
    "foodpanda",
    "lazada",
    "shopee",
    "taobao",
    "carousell",
    "propertyguru",
    "iproperty"
  ],
  games: [
    "pokemon",
    "lol",
    "mlbb",
    "nintendoswitch",
    "steam"
  ],
  ewallet: [
    "tng",
    "grab",
    "boost",
    "maybank2u",
    "bankacc"
  ]

}