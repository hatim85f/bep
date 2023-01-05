import React, { useEffect, useState } from "react";
import classes from "./registeration.module.css";

import Input from "../../components/input/Input";
import Selective from "../../components/input/Selective";
import { confirmAlert } from "react-confirm-alert";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { useSelector, useDispatch } from "react-redux";

import * as helpersActions from "../../store/helpers/helpersActions";
import * as authActions from "../../store/auth/authActions";

import useInput from "../../hooks/use-input";
import { countries } from "../../components/helpers/countries";
import SearchableSelect from "../../components/input/SearchableSelect";

import ErrorModal from "../../components/error/ErrorModal";

const Registeration = () => {
  const { error, errorMessage } = useSelector((state) => state.auth);
  const [countriesNames, setCountriesNames] = useState([]);
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [country, setCountry] = useState("");
  const [nationality, setNationality] = useState("");
  const [gender, setGender] = useState("");
  const [careerAspiration, setCareerAspiration] = useState("");
  const [courses, setCourses] = useState([]);
  const [source, setSource] = useState("");
  const [sourcePerson, setSourcePerson] = useState("");

  const isNotEmpty = (value) => value.trim() !== "";
  const isEmail = (value) => value.includes("@");

  const {
    value: userEmail,
    isValid: userEmailInvalid,
    valueChangeHandler: userEmailChangeHandler,
    inputBlurHandler: userEmailBlurHandler,
    reset: userEmailReset,
    hasError: userEmailHasError,
  } = useInput(isEmail);

  const {
    value: name,
    isValid: nameIsValid,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameReset,
    hasError: nameHasError,
  } = useInput(isNotEmpty);

  const {
    value: lastName,
    isValid: lastNameIsValid,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: lastNameReset,
    hasError: lastNameHasError,
  } = useInput(isNotEmpty);

  const {
    value: phoneNumber,
    isValid: phoneNumberIsValid,
    valueChangeHandler: phoneNumberChangeHandler,
    inputBlurHandler: phoneNumberBlurHandler,
    reset: phoneNumberReset,
    hasError: phoneNumberHasError,
  } = useInput(isNotEmpty);

  const {
    value: company,
    isValid: companyIsValid,
    valueChangeHandler: companyChangeHandler,
    inputBlurHandler: companyBlurHandler,
    reset: companyReset,
    hasError: companyHasError,
  } = useInput(isNotEmpty);

  const {
    value: position,
    isValid: positionIsValid,
    valueChangeHandler: positionChangeHandler,
    inputBlurHandler: positionBlurHandler,
    reset: positionReset,
    hasError: positionHasError,
  } = useInput(isNotEmpty);

  const {
    value: dob,
    isValid: dobIsValid,
    valueChangeHandler: dobChangeHandler,
    inputBlurHandler: dobBlurHandler,
    reset: dobReset,
    hasError: dobHasError,
  } = useInput(isNotEmpty);

  const {
    value: experience,
    isValid: experienceIsValid,
    valueChangeHandler: experienceChangeHandler,
    inputBlurHandler: experienceBlurHandler,
    reset: experienceReset,
    hasError: experienceHasError,
  } = useInput(isNotEmpty);

  const {
    value: password,
    isValid: passwordIsValid,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordReset,
    hasError: passwordHasError,
  } = useInput(isNotEmpty);

  const {
    value: userName,
    isValid: userNameIsValid,
    valueChangeHandler: userNameChangeHandler,
    inputBlurHandler: userNameBlurHandler,
    reset: userNameReset,
    hasError: userNameHasError,
  } = useInput(isNotEmpty);

  const {
    value: adminName,
    isValid: adminNameIsValid,
    valueChangeHandler: adminNameChangeHandler,
    inputBlurHandler: adminNameBlurHandler,
    reset: adminNameReset,
    hasError: adminNameHasError,
  } = useInput(isNotEmpty);

  const {
    value: linkedin,
    isValid: linkedinIsValid,
    valueChangeHandler: linkedinChangeHandler,
    inputBlurHandler: linkedinBlurHandler,
    reset: linkedinReset,
    hasError: linkedinHasError,
  } = useInput(isNotEmpty);

  const {
    value: whatsAppNum,
    isValid: whatsAppNumIsValid,
    valueChangeHandler: whatsAppNumChangeHandler,
    inputBlurHandler: whatsAppNumBlurHandler,
    reset: whatsAppNumReset,
    hasError: whatsAppNumHasError,
  } = useInput(isNotEmpty);

  const {
    value: referred,
    isValid: referredIsValid,
    valueChangeHandler: referredChangeHandler,
    inputBlurHandler: referredBlurHandler,
    reset: referredReset,
    hasError: referredHasError,
  } = useInput(isEmail);

  useEffect(() => {
    const newCountries = countries.map((a) => {
      return {
        label: a.country,
        value: a.country,
      };
    });

    setCountriesNames(newCountries);
  }, []);

  const aspiration = [
    { label: "Sales", value: "Sales" },
    { label: "Marketing", value: "Marketing" },
    { label: "Commercial", value: "Commercial" },
  ];

  const handleUpload = (e) => {
    if (name.length === 0 || lastName.length === 0) {
      dispatch(
        authActions.setError(
          "Error !",
          "You have to add your first and last names first"
        )
      );
      return;
    }
    if (e.target.files) {
      setImage(e.target.files[0]);
    }

    const storage = getStorage();
    const metadata = {
      contentType: "image/jpeg",
    };

    const storageRef = ref(storage, `${name}_${lastName}/image`);
    const uploadTask = uploadBytesResumable(
      storageRef,
      e.target.files[0],
      metadata
    );
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");

        if (snapshot.state === "paused") {
          console.log("Upload is paused");
        }
        if (snapshot.state === "running") {
          console.log("Upload is running");
        }
      },
      (error) => {
        if (error.code === "storage/unauthorized") {
          return;
        }
        if (error.code === "storage/canceled") {
          return;
        }

        if (error.code === "storage/unknown") {
          return;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageURL(downloadURL);
        });
      }
    );
  };

  const sourcseList = [
    "Social Media",
    "One of our admins",
    "Linkedin",
    "Friend",
  ];

  const dispatch = useDispatch();

  const clearError = () => {
    dispatch(authActions.clearError());
  };

  const submit = () => {
    if (nameIsValid && lastNameIsValid && phoneNumberIsValid) {
      dispatch(
        authActions.newUser({
          userEmail,
          firstName: name,
          lastName,
          password,
          userName,
          whatsAppNum,
          source,
          adminName,
          image: imageURL,
          phone: phoneNumber,
          gender,
          country: country.label,
          nationality: nationality.label,
          courses,
          currentCompany: company,
          position,
          experience,
          linkedin,
          DOB: dob,
          referredBy: referred,
          aspiration: careerAspiration.label,
        })
      );

      nameReset();
      lastNameReset();
      userEmailReset();
      phoneNumberReset();
      setCountry("");
      setNationality("");
      setImageURL("");
      setGender("");
      companyReset();
      positionReset();
      dobReset();
      experienceReset();
      setCareerAspiration("");
      referredReset();
      passwordReset();
      userNameReset();
      adminNameReset();
      whatsAppNumReset();
    }
  };

  if (error) {
    return (
      <ErrorModal title={error} message={errorMessage} onConfirm={clearError} />
    );
  }
  return (
    <div className={classes.container}>
      <strong className={classes.title}>Registeration</strong>
      <form className={classes.form}>
        <Input
          title="First Name"
          type="text"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          onFocus={nameReset}
        />
        {nameHasError && (
          <p className={classes.error}>This Field must not be Empty !</p>
        )}
        <Input
          title="Last Name"
          type="text"
          onChange={lastNameChangeHandler}
          onBlur={lastNameBlurHandler}
          onFocus={lastNameReset}
        />
        {lastNameHasError && (
          <p className={classes.error}>This Field must not be Empty !</p>
        )}
        <Input
          title="Email ID"
          type="email"
          onChange={userEmailChangeHandler}
          onBlur={userEmailBlurHandler}
          onFocus={userEmailReset}
        />
        {userEmailHasError && (
          <p className={classes.error}>Please Enter a valid Email ID</p>
        )}
        <Input
          title="User Name"
          type="text"
          onChange={userNameChangeHandler}
          onBlur={userNameBlurHandler}
          onFocus={userNameReset}
        />
        {userNameHasError && (
          <p className={classes.error}>Please Enter a valid User Name</p>
        )}
        <Input
          title="Password"
          type="password"
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          onFocus={passwordReset}
        />
        {passwordHasError && (
          <p className={classes.error}>Please Enter a valid Password</p>
        )}
        <Input
          title="Phone Number"
          type="text"
          onChange={phoneNumberChangeHandler}
          onBlur={phoneNumberBlurHandler}
          onFocus={phoneNumberReset}
        />
        {phoneNumberHasError && (
          <p className={classes.error}>This Field must not be Empty !</p>
        )}
        <Input
          title="WhatsApp Number"
          type="text"
          onChange={whatsAppNumChangeHandler}
          onBlur={whatsAppNumBlurHandler}
          onFocus={whatsAppNumReset}
        />
        {whatsAppNumHasError && (
          <p className={classes.error}>This Field must not be Empty !</p>
        )}
        <Input
          title="Linkedin Account Links"
          type="text"
          onChange={linkedinChangeHandler}
          onBlur={linkedinBlurHandler}
          onFocus={linkedinReset}
        />
        {linkedinHasError && (
          <p className={classes.error}>This Field must not be Empty !</p>
        )}
        <Selective
          title="How did you hear about Us ?"
          onChange={(e) => setSource(e)}
          options={sourcseList}
        />
        {source === "One of our admins" && (
          <>
            <Input
              title="Admin Name"
              type="text"
              onChange={adminNameChangeHandler}
              onBlur={adminNameBlurHandler}
              onFocus={adminNameReset}
            />
            {adminNameHasError && (
              <p className={classes.error}> Please Enter a valid admin Name </p>
            )}
          </>
        )}
        <SearchableSelect
          title="Country of Residence"
          options={countriesNames}
          onChange={(e) => setCountry(e)}
        />
        <SearchableSelect
          title="Nationality"
          options={countriesNames}
          onChange={(e) => setNationality(e)}
        />

        <Input title="Image" type="file" onChange={(e) => handleUpload(e)} />
        <Selective
          title="Gender"
          onChange={(e) => setGender(e)}
          options={["Male", "Female"]}
        />
        <Input
          title="Company"
          type="text"
          onChange={companyChangeHandler}
          onBlur={companyBlurHandler}
          onFocus={companyReset}
        />
        {companyHasError && (
          <p className={classes.error}> This field is important </p>
        )}
        <Input
          title="Position"
          type="text"
          onChange={positionChangeHandler}
          onBlur={positionBlurHandler}
          onFocus={positionReset}
        />
        {positionHasError && (
          <p className={classes.error}>Please Add your Currnet Position</p>
        )}
        <Input
          title="Date of Birth"
          type="date"
          onChange={dobChangeHandler}
          onBlur={dobBlurHandler}
          onFocus={dobReset}
        />
        <Input
          title="Years of Experience"
          type="number"
          onChange={experienceChangeHandler}
          onBlur={experienceBlurHandler}
          onFocus={experienceReset}
        />
        <SearchableSelect
          title="Aspiration"
          options={aspiration}
          onChange={(e) => setCareerAspiration(e)}
        />
        <Input
          title="Referred By"
          type="email"
          placeholder="abc@email.com"
          onChange={referredChangeHandler}
          onBlur={referredBlurHandler}
          onFocus={referredReset}
        />
      </form>
      <button className={classes.submitBtn} onClick={submit}>
        Submit
      </button>
    </div>
  );
};

export default Registeration;
