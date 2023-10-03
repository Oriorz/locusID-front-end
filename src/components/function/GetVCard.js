import { useRef, useState } from "react";
import { socials } from "../namelist";
import M from "materialize-css";

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
      } else {
        this.vcard += "\n" + "URL;CHARSET=UTF-8:" + text;
      }
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
      const cleanText = text.replaceAll("\n", ". ");
      this.vcard += "\n" + "NOTE;CHARSET=UTF-8:" + cleanText;
    };

    this.addAddress = function (text, type = "work" || "home") {
      if (type == "home") {
        //LABEL;CHARSET=UTF-8;TYPE=HOME:Home Address
        this.vcard += "\n" + "LABEL;CHARSET=UTF-8;TYPE=HOME:Home Address";
        this.vcard += "\n" + "ADR;CHARSET=UTF-8;TYPE=HOME:" + text;
      } else {
        this.vcard += "\n" + "LABEL;CHARSET=UTF-8;TYPE=WORK:Work Address";
        this.vcard += "\n" + "ADR;CHARSET=UTF-8;TYPE=WORK:" + text;
      }
    };

    this.addSocial = function (text, type = "custom", header = ":https://") {
      //this.vcard += "\n" + "X-SOCIALPROFILE;CHARSET=UTF-8;TYPE=" + type + header + text;
      this.vcard +=
        "\n" +
        "X-SOCIALPROFILE;CHARSET=UTF-8;TYPE=CUSTOM:" +
        type +
        header +
        text;
    };

    this.export = function () {
      return this.vcard + "\n" + this.last;
    };
  }

  const handleVCard = () => {
    if (!userProfile.user.vcard) {
      M.toast({ html: "Please set Contact Card Details first" });
      return;
    }
    //var resultString = stringToAscii("BEGIN:VCARD")

    const vCard = new VCard();
    userProfile.user.vcard?.name
      ? vCard.addName(userProfile.user.vcard.name)
      : vCard.addName("My Name");
    vCard.addEmail(
      userProfile.user.vcard?.email ? userProfile.user.vcard.email : ""
    );
    if (userProfile.user.vcard?.phone) {
      vCard.addPhone(userProfile.user.vcard.phone);
    }
    if (userProfile.user.vcard?.organization) {
      vCard.addOrg(userProfile.user.vcard.organization);
    }
    if (userProfile.user.vcard?.title) {
      vCard.addTitle(userProfile.user.vcard.title);
    }
    if (userProfile.user.vcard?.url) {
      vCard.addUrl(userProfile.user.vcard.url, "home");
    }
    if (userProfile.user.vcard?.address) {
      vCard.addAddress(userProfile.user.vcard.address, "home");
    }
    if (userProfile.user.vcard?.notes) {
      vCard.addNote(userProfile.user.vcard.notes);
    }
    if (userProfile.user.vcard?.workemail) {
      vCard.addEmail(userProfile.user.vcard.workemail, "work-email");
    }
    if (userProfile.user.vcard?.homephone) {
      vCard.addPhone(userProfile.user.vcard.homephone, "home");
    }
    if (userProfile.user.vcard?.workphone) {
      vCard.addPhone(userProfile.user.vcard?.workphone, "work");
    }
    if (userProfile.user.vcard?.homefax) {
      vCard.addPhone(userProfile.user.vcard?.homefax, "home,fax");
    }
    if (userProfile.user.vcard?.workfax) {
      vCard.addPhone(userProfile.user.vcard?.workfax, "work,fax");
    }
    if (userProfile.user.vcard?.nickname) {
      vCard.addNick(userProfile.user.vcard?.nickname);
    }
    /* if (userProfile.user.role) {
      vCard.addRole(userProfile.user.role)
    } */

    if (userProfile.user.vcard?.workurl) {
      vCard.addUrl(userProfile.user.vcard?.workurl, "work");
    }

    if (userProfile.user.vcard?.workaddress) {
      vCard.addAddress(userProfile.user.vcard?.workaddress, "work");
    }

    vCard.addUrl(window.location.href, "itap");

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
        className=" rounded-full select-none bg-button-fill w-16 h-16 text-skin-base text-center justify-center items-center drop-shadow-lg"
        onClick={() => handleVCard()}
      >
        <i className="material-icons small inline-icon text-button-base">
          file_download
        </i>
      </button>
    </>
  );
}

export default GetVCard;
