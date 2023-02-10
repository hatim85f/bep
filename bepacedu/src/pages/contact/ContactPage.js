import React from "react";

import classes from "./contact.module.css";

import { ImLocation2 } from "react-icons/im";
import { HiOutlineMailOpen } from "react-icons/hi";
import { BsTelephoneOutboundFill } from "react-icons/bs";
import Form from "../../components/contact/Form";
import Contact from "../../components/contact/Contact";

const ContactPage = () => {
  return (
    <div className={classes.container}>
      <div className={classes.row}>
        <div className={classes.itemContainer}>
          <div className={classes.iconContainer}>
            <ImLocation2 className={classes.icon} />
          </div>
          <iframe
            src="https://maps.google.com/maps?q=Mustafa%20Elnhas%20St%20Nasr%20City&amp;t=m&amp;z=13&amp;output=embed&amp;iwloc=near"
            title="Mustafa Elnhas St Nasr City"
            aria-label="Mustafa Elnhas St Nasr City"
            data-rocket-lazyload="fitvidscompatible"
            data-lazy-src="https://maps.google.com/maps?q=Mustafa%20Elnhas%20St%20Nasr%20City&amp;t=m&amp;z=13&amp;output=embed&amp;iwloc=near"
            data-was-processed="true"
            className={classes.map}
          ></iframe>
          <div className={classes.addressRow}>
            <strong className={classes.header}>Cairo Branch : </strong>
            <address>
              Alkodra building, Mustafa Elnhas St, 10th zone, Nasr City, Cairo,
              Egypt
            </address>
          </div>
          <div className={classes.addressRow}>
            <strong className={classes.header}>Tanta Branch : </strong>
            <address>
              Cairo-Alex agriculture road, behind medical campus, Loaloa
              building, 1st floor, Tanta, Gharbia
            </address>
          </div>
        </div>
        <div className={classes.itemContainer}>
          <div className={classes.iconContainer}>
            <HiOutlineMailOpen className={classes.icon} />
          </div>
          <strong className={classes.mail}>
            <a className={classes.ref} href="mailTo:info@bepacedu.com">
              info@bepacedu.com
            </a>
          </strong>
          <strong className={classes.mail}>
            <a className={classes.ref} href="mailTo:hr@bepacedu.com">
              hr@bepacedu.com
            </a>
          </strong>
          <strong className={classes.mail}>
            <a className={classes.ref} href="mailTo:sales@bepacedu.com">
              sales@bepacedu.com
            </a>
          </strong>
          <strong className={classes.mail}>
            <a className={classes.ref} href="mailTo:contact@bepacedu.com">
              contact@bepacedu.com
            </a>
          </strong>
        </div>
        <div className={classes.itemContainer}>
          <div className={classes.iconContainer}>
            <BsTelephoneOutboundFill className={classes.icon} />
          </div>
          <strong className={classes.mail}>
            <a className={classes.ref} href="tel:+201121039957">
              +2 011 210 3 9957
            </a>
          </strong>
          <strong className={classes.mail}>
            <a className={classes.ref} href="tel:+201118116811">
              +2 011 811 68 11
            </a>
          </strong>
          <strong className={classes.mail}>
            <a className={classes.ref} href="tel:+201003543969 ">
              +2 010 035 49 969
            </a>
          </strong>
        </div>
      </div>
      <div className={classes.twoRow}>
        <Form />
        <Contact />
      </div>
    </div>
  );
};

export default ContactPage;
