import React, { useEffect, useState } from "react";

import Input from "../../components/input/Input";
import TextArea from "../../components/input/TextArea";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import classes from "./portfolio.module.css";

import { IoIosAddCircle, IoMdRemoveCircle } from "react-icons/io";
import UploadImage from "../../components/input/UploadImage";

import * as aboutActions from "../../store/about/aboutActions";
import * as authActions from "../../store/auth/authActions";

import ErrorModal from "../../components/error/ErrorModal";

const CompanyPortfolio = () => {
  const { about } = useSelector((state) => state.about);
  const { error, errorMessage } = useSelector((state) => state.auth);

  const [mainMessage, setMainMessage] = useState("");
  const [mission, setMission] = useState("");
  const [vision, setVision] = useState("");
  const [philosophy, setPhilosophy] = useState("");
  const [values, setValues] = useState([]);
  const [founderMessage, setFounderMessage] = useState("");
  const [founder, setFounder] = useState([
    {
      name: "",
      certificate: "",
      image: "",
      history: [],
    },
  ]);
  const [team, setTeam] = useState([{ name: "", image: "", title: "" }]);
  const [editing, setEditing] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(aboutActions.getAbout());
  }, [dispatch]);

  useEffect(() => {
    if (about.length > 0) {
      setMainMessage(about[0].mainMessage);
      setMission(about[0].mission);
      setVision(about[0].vision);
      setPhilosophy(about[0].philosophy);
      setValues(about[0].values);
      setFounderMessage(about[0].founderMessage);
      setFounder(about[0].founder);
      setTeam(about[0].team);
      setEditing(true);
    }
  }, [about]);

  const addValues = () => {
    let newValues = values;
    newValues.push("");
    setValues(values.map((a) => a));
  };

  const changeValue = (text, index) => {
    let newValues = values;
    newValues[index] = text;
    setValues(newValues.map((a) => a));
  };

  const removeItem = (index) => {
    let newValues = values;

    newValues.splice(index, 1);

    setValues(newValues.map((a) => a));
  };

  const changeFounderName = (text) => {
    let newFounder = founder;
    newFounder[0].name = text;
    setFounder(newFounder.map((a) => a));
  };

  const changeFounderCertificated = (text) => {
    let newFounder = founder;
    newFounder[0].certificate = text;
    setFounder(newFounder.map((a) => a));
  };

  const changeFounderImage = (e) => {
    let newFounder = founder;
    newFounder[0].image = e;
    setFounder(newFounder);
  };

  const addHistory = () => {
    let newFounder = founder;
    const history = newFounder[0].history;
    history.push("");
    setFounder(newFounder.map((a) => a));
  };

  const removeHistory = (index) => {
    let newFounder = founder;
    const history = newFounder[0].history;
    history.splice(index, 1);
    setFounder(newFounder.map((a) => a));
  };

  const changeHistory = (text, index) => {
    let newFounder = founder;
    const history = newFounder[0].history;
    history[index] = text;
    setFounder(newFounder.map((a) => a));
  };

  const addTeamMember = () => {
    let newTeam = team;
    newTeam.push({ name: "", title: "", image: "" });
    setTeam(newTeam.map((t) => t));
  };

  const removeMember = (index) => {
    let newTeam = team;
    newTeam.splice(index, 1);
    setTeam(newTeam.map((t) => t));
  };

  const changeMemberName = (text, index) => {
    let newTeam = team;
    newTeam[index]["name"] = text;
    setTeam(newTeam.map((t) => t));
  };

  const changeMemberTitle = (text, index) => {
    let newTeam = team;
    newTeam[index]["title"] = text;
    setTeam(newTeam.map((t) => t));
  };

  const changeMemberImage = (image, index) => {
    let newTeam = team;
    newTeam[index]["image"] = image;
    setTeam(newTeam);
  };

  const navigate = useNavigate("");

  const submit = () => {
    if (editing) {
      dispatch(
        aboutActions.updateAbout(
          {
            mainMessage,
            mission,
            vision,
            founderMessage,
            founder: founder[0],
            team,
            philosophy,
            values,
          },
          about._id
        )
      );
    } else {
      dispatch(
        aboutActions.addAbout({
          mainMessage,
          mission,
          vision,
          founderMessage,
          founder: founder[0],
          team,
          philosophy,
          values,
        })
      );
    }
  };

  const clearError = () => {
    dispatch(authActions.clearError());
    navigate("/dashboard");
  };

  if (error) {
    return (
      <ErrorModal title={error} message={errorMessage} onConfirm={clearError} />
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.inputContainer}>
        <TextArea
          title="Main Message"
          onChange={(e) => setMainMessage(e.target.value)}
          defaultValue={mainMessage}
        />
        <Input
          title="Mission"
          onChange={(e) => setMission(e.target.value)}
          defaultValue={mission}
        />
        <Input
          title="Vision"
          onChange={(e) => setVision(e.target.value)}
          defaultValue={vision}
        />
        <Input
          title="Our Philosophy"
          onChange={(e) => setPhilosophy(e.target.value)}
          defaultValue={philosophy}
        />
        <div className={classes.valuesContainer}>
          <strong className={classes.label}>Add Values</strong>
          <IoIosAddCircle className={classes.add} onClick={addValues} />
        </div>
        {values.length > 0 &&
          values.map((v, i) => {
            return (
              <div className={classes.valueRow} key={i}>
                <Input
                  title={`Add value number ${i + 1}`}
                  onChange={(e) => changeValue(e.target.value, i)}
                  defaultValue={v}
                />
                <IoMdRemoveCircle
                  className={classes.remove}
                  onClick={() => removeItem(i)}
                />
              </div>
            );
          })}
        <TextArea
          title="Founder Message"
          onChange={(e) => setFounderMessage(e.target.value)}
          defaultValue={founderMessage}
        />
        <Input
          title="Founder Name"
          onChange={(e) => changeFounderName(e.target.value)}
          defaultValue={founder.name}
        />
        <Input
          title="Founder Certificates"
          onChange={(e) => changeFounderCertificated(e.target.value)}
          defaultValue={founder.certificate}
        />
        <UploadImage
          title="Founder Image"
          path="/bepac/founder/image"
          getImageURL={(url) => changeFounderImage(url)}
        />
        <div className={classes.valuesContainer}>
          <strong className={classes.label}>Add History</strong>
          <IoIosAddCircle className={classes.add} onClick={addHistory} />
        </div>
        {founder[0].history.length > 0 &&
          founder[0].history.map((h, i) => {
            return (
              <div className={classes.valueRow} key={i}>
                <Input
                  title={`Add history Point`}
                  onChange={(e) => changeHistory(e.target.value, i)}
                  defaultValue={h}
                />
                <IoMdRemoveCircle
                  className={classes.remove}
                  onClick={() => removeHistory(i)}
                />
              </div>
            );
          })}
        <div className={classes.valuesContainer}>
          <strong className={classes.label}>Team Members</strong>
          <IoIosAddCircle className={classes.add} onClick={addTeamMember} />
        </div>
        {team.length > 0 &&
          team.map((t, i) => {
            return (
              <div className={classes.teamContainer} key={i}>
                <IoMdRemoveCircle
                  className={classes.teamRemove}
                  onClick={() => removeMember(i)}
                />
                <Input
                  title="Member Name"
                  onChange={(e) => changeMemberName(e.target.value, i)}
                  defaultValue={t.name}
                />
                <Input
                  title="Member Title"
                  onChange={(e) => changeMemberTitle(e.target.value, i)}
                  defaultValue={t.title}
                />
                <UploadImage
                  title="Member Image"
                  getImageURL={(image) => changeMemberImage(image, i)}
                  path={`/bepac/members/${t.name}`}
                />
              </div>
            );
          })}
        <div className={classes.buttonContainer}>
          <button className={classes.submit} onClick={submit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyPortfolio;
