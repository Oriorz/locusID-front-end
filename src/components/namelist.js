const { default: Home } = require("./screens/Home");

module.exports = {
  readme:
    "socialss naming need to change, socials is actual the id of all socialss",
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
    "reddit",
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
    url: false,
    workurl: false,
    birthday: false,
    address: false,
    workaddress: false,
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
    reddit: false,
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
    url: true,
    workurl: true,
    birthday: true,
    address: true,
    workaddress: true,
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
    reddit: true,
  },
  messaging: ["whatsapp", "wechat", "line", "telegram"],
  socials: [
    {
      id: "facebook",
      value: "facebook",
      label: "Facebook",
      title: "Facebook",
      src: "../images/facebook.png",
      isUrl: true,
      example: "www.facebook.com/itap.3",
      link: "https://www.facebook.com/",
      shortlink: "www.facebook.com/",
      vcard: "Facebook",
    },
    {
      id: "whatsapp",
      value: "whatsapp",
      label: "Whatsapp",
      title: "Whatsapp Messenger",
      src: "../images/whatsapp.png",
      isUrl: true,
      example: "https://wa.me/601112345678",
      /* link: "https://api.whatsapp.com/send?phone=", */
      link: "https://wa.me/",
      shortlink: "wa.me/",
      vcard: "WhatsappMessenger",
    },
    {
      id: "instagram",
      value: "instagram",
      label: "Instagram",
      title: "Instagram",
      src: "../images/instagram.png",
      isUrl: true,
      example: "https://www.instagram.com/vipbakeryshop/",
      link: "https://www.instagram.com/",
      shortlink: "www.instagram.com/",
      vcard: "Instagram",
    },
    {
      id: "twitter",
      value: "twitter",
      label: "Twitter",
      title: "Twitter",
      src: "../images/twitter.png",
      isUrl: true,
      example: "https://www.twitter.com/@loh_meng",
      link: "https://www.twitter.com/",
      shortlink: "www.twitter.com/",
      vcard: "Twitter",
    },
    {
      id: "telegram",
      value: "telegram",
      label: "Telegram",
      title: "Telegram Messenger",
      src: "../images/telegram.png",
      isUrl: true,
      example: "https://t.me/Oriorz",
      link: "https://t.me/",
      shortlink: "t.me/",
      vcard: "TelegramMessenger",
    },
    {
      id: "linkedin",
      value: "linkedin",
      label: "Linkedin",
      title: "Linkedin",
      src: "../images/linkedin.png",
      isUrl: true,
      example: "https://www.linkedin.com/in/chee-meng-loh-17b929256",
      link: "https://www.linkedin.com/in/",
      shortlink: "www.linkedin.com/in/",
      vcard: "Linkedin",
    },
    {
      id: "line",
      value: "line",
      label: "Line",
      title: "Line",
      src: "../images/line.png",
      isUrl: false,
      example: "https://line.me/R/ti/p/@linedevelopers",
      link: "https://line.me/R/ti/p/",
      shortlink: "line.me/R/ti/p/",
      vcard: "Line",
    },
    /* {
      id: "skype",
      value: "skype",
      label: "Skype",
      title: "Skype",
      src: "../images/skype.png",
      isUrl: true,
      example: "...",
      link: "https://www.skype.com/",
      shortlink: "www.skype.com/",
      vcard: "Skype",
    }, */
    {
      id: "wechat",
      value: "wechat",
      label: "Wechat",
      title: "Wechat",
      src: "../images/wechat.png",
      isUrl: false,
      example: "weixin://dl/chat?miaomiao",
      link: "weixin://dl/chat?",
      shortlink: "weixin://dl/chat?",
      vcard: "Wechat",
    },
    {
      id: "foursquare",
      value: "foursquare",
      label: "Foursquare",
      title: "Foursquare",
      src: "../images/foursquare.png",
      isUrl: true,
      example: "...",
      link: "https://www.foursquare.com/",
      shortlink: "www.foursquare.com/",
      vcard: "Foursquare",
    },
    {
      id: "xiaohongshu",
      value: "xiaohongshu",
      label: "Xiaohongshu",
      title: "小红书",
      src: "../images/xiaohongshu.png",
      isUrl: true,
      example: "...",
      link: "https://www.xiaohongshu.com/user/profile/",
      shortlink: "https://www.xiaohongshu.com/user/profile/",
      vcard: "xiaohongshu",
    },
    {
      id: "reddit",
      value: "reddit",
      label: "Reddit",
      title: "Reddit",
      src: "../images/reddit.png",
      isUrl: true,
      example: "...",
      link: "https://www.reddit.com/",
      shortlink: "www.reddit.com/",
      vcard: "Reddit",
    },
    {
      id: "tiktok",
      value: "tiktok",
      label: "Tiktok",
      title: "Tiktok",
      src: "../images/tiktok.svg",
      isUrl: true,
      example: "https://www.tiktok.com/@justinflom",
      link: "https://www.tiktok.com/",
      shortlink: "www.tiktok.com/",
      vcard: "Tiktok",
    },
  ],
  bios: [
    {
      id: "name",
      title: "Name",
      src: "../images/name.jpg",
      example: "...",
      vcard: "Name",
    },
    {
      id: "nickname",
      title: "NickName (Optional)",
      src: "../images/name.jpg",
      example: "...",
      vcard: "NickName",
    },
    {
      id: "workemail",
      title: "Work Email (Optional)",
      src: "../images/email.png",
      example: "...",
      vcard: "work-email",
    },
    {
      id: "title",
      title: "Title (Optional)",
      src: "../images/title.jpg",
      example: "...",
      vcard: "Title",
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
      vcard: "Organization",
    },
    {
      id: "phone",
      title: "Handphone",
      src: "../images/phone.png",
      example: "...",
      vcard: "phone",
    },
    {
      id: "homephone",
      title: "Home Phone (Optional)",
      src: "../images/phone.png",
      example: "...",
      vcard: "home",
    },
    {
      id: "workphone",
      title: "Work Phone (Optional)",
      src: "../images/phone.png",
      example: "...",
      vcard: "Work",
    },
    {
      id: "homefax",
      title: "Home Fax (Optional)",
      src: "../images/fax.jpg",
      example: "...",
      vcard: "homefax",
    },
    {
      id: "workfax",
      title: "Work Fax (Optional)",
      src: "../images/fax.jpg",
      example: "...",
      vcard: "workfax",
    },
    {
      id: "url",
      title: "Personal Website",
      src: "../images/website.jpg",
      example: "...",
      vcard: "url",
    },
    {
      id: "workurl",
      title: "Office Website",
      src: "../images/website.jpg",
      example: "...",
      vcard: "workurl",
    },
    {
      id: "birthday",
      title: "Birthday (optional)",
      src: "../images/birthday.jpg",
      example: "...",
      vcard: "birthday",
    },
    {
      id: "address",
      title: "Address (optional)",
      src: "../images/address.jpg",
      example: "...",
      vcard: "address",
    },
    {
      id: "workaddress",
      title: "Work Address (optional)",
      src: "../images/address.jpg",
      example: "...",
      vcard: "workaddress",
    },
  ],
  sales: [
    {
      id: "grab",
      value: "grab",
      label: "Grab",
      title: "Grab",
      src: "../images/grab.png",
      example: "...",
      link: "https://www.grab.com/my/",
      shortlink: "www.grab.com/my/",
      vcard: "Grab",
    },
    {
      id: "foodpanda",
      value: "foodpanda",
      label: "Foodpanda",
      title: "Foodpanda",
      src: "../images/foodpanda.png",
      example: "...",
      link: "https://www.foodpanda.my/",
      shortlink: "www.foodpanda.my/",
      vcard: "Foodpanda",
    },
    {
      id: "patreon",
      value: "patreon",
      label: "Patreon",
      title: "Patreon",
      src: "../images/name.jpg",
      example: "https://www.patreon.com/Kurzgesagt",
      link: "https://www.patreon.com/",
      shortlink: "www.patreon.com/",
      vcard: "Patreon",
    },
    "lazada",
    "shopee",
    "taobao",
    "carousell",
    "propertyguru",
    "iproperty",
  ],
  games: ["pokemon", "lol", "mlbb", "nintendoswitch", "steam"],
  ewallet: ["tng", "grab", "boost", "maybank2u", "bankacc"],
};
