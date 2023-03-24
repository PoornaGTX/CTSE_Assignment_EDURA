import { useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";

import Button from "../icons/Button";
import ColorPixer from "../colorPixer/ColorPixer";
import TeacherInput from "./TeacherInput";

const TeacherAddNoticeForm = ({
  labelName2,
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValuesForEdit,
  titleProp,
  descriptionProp,
  linkProp,
  dateProp,
}) => {
 
  const [title, setTitle] = useState(defaultValuesForEdit?.title || "");
  const [description, setDescription] = useState(defaultValuesForEdit?.description || "");
  const [link, setLink] = useState(defaultValuesForEdit?.link || "");
  const [color, setColor] = useState(defaultValuesForEdit?.color || "");
  const [date, setDate] = useState(defaultValuesForEdit?.date || "");


  //background color color handler
  const colorHandler = (selectedColor) => {
    setColor(selectedColor);
  };

  //title input Handler
  const titleChangeHandler = (value) => {
    setTitle(value);
  };

  //description input Handler
  const descriptionChangeHandler = (value) => {
    setDescription(value);
  };

   //link input Handler
   const linkChangeHandler = (value) => {
    setLink(value);
  };

   //date input Handler
   const dateChangeHandler = (value) => {
    setDate(value);
  };

  const sumbitHandlerGrade = () => {
    onSubmit(title, description, link, date, color);
  };

  return (
    <View style={styles.form}>
      <Text style={styles.formTitle}>
        {labelName2 === false ? "Add Notice" : "Notice Details"}
      </Text>
      <TeacherInput
        label='Title'
        textInputAllProps={{
          onChangeText: titleChangeHandler,
          value: title || titleProp,
        }}
      />
      <TeacherInput
        label='Description'
        textInputAllProps={{
          onChangeText: descriptionChangeHandler,
          value: description || descriptionProp ,
          editable: true,
        }}
      />
      <TeacherInput
        label='Link'
        textInputAllProps={{
          onChangeText: linkChangeHandler,
          value: link || linkProp ,
          editable: true,
        }}
      />
      <TeacherInput
        label='date'
        textInputAllProps={{
          onChangeText: dateChangeHandler,
          value: date || dateProp ,
          editable: true,
        }}
      />
      <View style={styles.selectColorView}>
        <Text style={styles.colorTilte}>
          Select Color for Notice background
        </Text>
        <View
          style={[
            styles.viewSelect,
            { backgroundColor: color },
          ]}
        ></View>
      </View>

      <View style={styles.colorViewContainer}>
        <ColorPixer
          subjectColor="#f54242"
          onPressProp={colorHandler}
        />
        <ColorPixer
          subjectColor="#f5a442"
          onPressProp={colorHandler}
        />
        <ColorPixer
          subjectColor="#f5428d"
          onPressProp={colorHandler}
        />
        <ColorPixer
          subjectColor="#f5d142"
          onPressProp={colorHandler}
        />
        <ColorPixer
          subjectColor="#368dff"
          onPressProp={colorHandler}
        />
        <ColorPixer
          subjectColor="#41d95d"
          onPressProp={colorHandler}
        />
        <ColorPixer
          subjectColor="#f5428d"
          onPressProp={colorHandler}
        />
        <ColorPixer
          subjectColor="#9eecff"
          onPressProp={colorHandler}
        />
        <ColorPixer
          subjectColor="#ffc7ff"
          onPressProp={colorHandler}
        />
        <ColorPixer
          subjectColor="#47fced"
          onPressProp={colorHandler}
        />
        <ColorPixer
          subjectColor="#dbde3c"
          onPressProp={colorHandler}
        />
        <ColorPixer
          subjectColor="#e386fc"
          onPressProp={colorHandler}
        />
        <ColorPixer
          subjectColor="#ff5c95"
          onPressProp={colorHandler}
        />
        <ColorPixer
          subjectColor="red"
          onPressProp={colorHandler}
        />
      </View>

      <View style={styles.buttons}>
        <Button mode="flat" onPressProp={onCancel} style={styles.button}>
          Cancle
        </Button>
        <Button
          onPressProp={sumbitHandlerGrade}
          style={styles.button}
        >
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default TeacherAddNoticeForm;

const styles = StyleSheet.create({
  form: {
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 25,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 16,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },

  colorTilte: {
    marginHorizontal: 4,
    marginVertical: 8,
    fontSize: 14,
    color: "#c6affc",
    marginBottom: 4,
    fontWeight: "bold",
  },

  colorViewContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  selectColorView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  viewSelect: {
    height: 15,
    width: 15,
    marginHorizontal: 8,
    marginTop: 5,
  },
});
