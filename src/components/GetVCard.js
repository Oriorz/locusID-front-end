import { useRef, useState } from "react";
import { socials } from "./namelist";

function GetVCard({ userProfile }) {
  /* const handleVCard = (text) => {
    if (text) {
      navigator.clipboard.writeText(text);
    } else {
      navigator.clipboard.writeText("no copied text");
    }
    console.log("diu", userProfile);
  }; */

  const toAscii = (text) => {
    const value = text.charCodeAt(0).toString();
    const numValue = parseInt(value);
    if (
      (numValue <= 122 && numValue >= 97) ||
      (numValue >= 65 && numValue <= 90) ||
      (numValue >= 48 && numValue <= 57) ||
      numValue == 46
    ) {
      return text;
    }
    if (numValue < 16) {
      return "%0" + text.charCodeAt(0).toString(16);
    }
    return "%" + text.charCodeAt(0).toString(16);
  };
  const stringToAscii = (text) => {
    var resultString = "";
    for (var i = 0; i < text.length; i++) {
      resultString += toAscii(text[i]);
    }
    return resultString;
  };
  function VCard() {
    // assigning  parameter values to the calling object
    this.vcard = "BEGIN:VCARD\nVERSION:3.0";
    this.last = "END:VCARD";

    this.addName = function (name) {
      this.vcard += "\n" + "N;CHARSET=UTF-8:" + name;
    };

    this.addGender = function (gender = "F") {
      this.vcard += "\n" + "GENDER:" + gender;
    };

    this.addBday = function (bday) {
      this.vcard += "\n" + "BDAY:" + bday;
    };

    this.addEmail = function (text, type = "Home-email") {
      this.vcard +=
        "\n" + "EMAIL;CHARSET=UTF-8;type=" + type + ",INTERNET:" + text;
    };

    this.addPhoto = function (url) {
      this.vcard += "\n" + "PHOTO;TYPE=png:" + url;
    };

    this.addLogo = function (url) {
      this.vcard += "\n" + "LOGO;TYPE=png:" + url;
    };

    this.addPhone = function (number, type = "Cell") {
      this.vcard += "\n" + "TEL;TYPE=" + type + ":" + number;
    };

    this.addUrl = function (text, type) {
      if (type) {
        this.vcard += "\n" + "URL;type=" + type + ";CHARSET=UTF-8:" + text;
        return;
      }
      this.vcard += "\n" + "URL;CHARSET=UTF-8:" + text;
    };

    this.addNick = function (text) {
      this.vcard += "\n" + "NICKNAME;CHARSET=UTF-8:" + text;
    };

    this.addTitle = function (text) {
      this.vcard += "\n" + "TITLE;CHARSET=UTF-8:" + text;
    };
    this.addRole = function (text) {
      this.vcard += "\n" + "ROLE;CHARSET=UTF-8:" + text;
    };
    this.addOrg = function (text) {
      this.vcard += "\n" + "ORG;CHARSET=UTF-8:" + text;
    };

    this.addNote = function (text) {
      this.vcard += "\n" + "NOTE;CHARSET=UTF-8:" + text;
    };

    this.addAddress = function (text, type = "work" || "home") {
      if (type == "home") {
        //LABEL;CHARSET=UTF-8;TYPE=HOME:Home Address
        this.vcard += "\n" + "LABEL;CHARSET=UTF-8;TYPE=HOME:Home Address";
        this.vcard += "\n" + "ADR;CHARSET=UTF-8;TYPE=HOME:" + text;
        return;
      }
      this.vcard += "\n" + "LABEL;CHARSET=UTF-8;TYPE=WORK:Work Address";
      this.vcard += "\n" + "ADR;CHARSET=UTF-8;TYPE=WORK:" + text;
    };

    this.addSocial = function (text, type = "custom", header = ":https://") {
      this.vcard += "\n" + "X-SOCIALPROFILE;TYPE=" + type + header + text;
    };

    this.export = function () {
      return this.vcard + "\n" + this.last;
    };
  }

  const handleVCard = () => {
    //var resultString = stringToAscii("BEGIN:VCARD")

    const vCard = new VCard();
    userProfile.user.name
      ? vCard.addName(userProfile.user.name)
      : vCard.addName("My Name");
    //vCard.addName(userProfile.user.name)
    //vCard.addGender()
    //vCard.addBday("20100101")
    vCard.addEmail(userProfile.user.email);
    console.log("getvcard called");
    console.log("userprofile is", userProfile);
    console.log("getvcard2 called");
    if (userProfile.user.workemail) {
      console.log("workemail called", userProfile.user.workemail);
      vCard.addEmail(userProfile.user.workemail, "work-email");
    }
    if (userProfile.user.phone) {
      vCard.addPhone(userProfile.user.phone);
    }
    if (userProfile.user.homephone) {
      vCard.addPhone(userProfile.user.homephone, "home");
    }
    if (userProfile.user.workphone) {
      vCard.addPhone(userProfile.user.workphone, "work");
    }
    if (userProfile.user.homefax) {
      vCard.addPhone(userProfile.user.homefax, "home,fax");
    }
    if (userProfile.user.workfax) {
      vCard.addPhone(userProfile.user.workfax, "work,fax");
    }
    if (userProfile.user.nickname) {
      vCard.addNick(userProfile.user.nickname);
    }
    if (userProfile.user.title) {
      vCard.addTitle(userProfile.user.title);
    }
    /* if (userProfile.user.role) {
      vCard.addRole(userProfile.user.role)
    } */
    if (userProfile.user.organization) {
      vCard.addOrg(userProfile.user.organization);
    }

    if (userProfile.user.url) {
      vCard.addUrl(userProfile.user.url, "home");
    }

    if (userProfile.user.workurl) {
      vCard.addUrl(userProfile.user.workurl, "work");
    }

    if (userProfile.user.address) {
      vCard.addAddress(userProfile.user.address, "home");
    }
    if (userProfile.user.workaddress) {
      vCard.addAddress(userProfile.user.address, "work");
    }

    vCard.addNote("");

    socials.map((item) => {
      if (userProfile.user[item.id]) {
        if (item.id === "wechat") {
          vCard.addSocial(
            item.shortlink + userProfile.user[item.id],
            item.vcard,
            ":"
          );
        } else {
          vCard.addSocial(
            item.shortlink + userProfile.user[item.id],
            item.vcard
          );
        }
      }

      //vCard.addNote(notes)
      /* if (userProfile.user.notes) {
        vCard.addNote(userProfile.user.notes)
      } */
    });

    var greeting = vCard.export();
    greeting = stringToAscii(greeting);
    console.log(greeting);
    window.open("data:text/x-vcard;urlencoded," + greeting);

    /* var data =
      "BEGIN%3AVCARD%aVERSION%3A3.0%0AN%3ADoe%3BJohn%0AFN%3AJohn%20Doe%0ATITLE%3A08002221111%0AORG%3AStackflowover%0AEMAIL%3BTYPE%3DINTERNET%3Ajohndoe%40gmail.com%0AEND%3AVCARD";
    window.open("data:text/x-vcard;urlencoded," + data); */
  };

  return (
    <>
      <button
        className="btn waves-effect waves-light green darken-3"
        onClick={() => handleVCard()}
      >
        Get Contact
      </button>
    </>
  );
}

export default GetVCard;
