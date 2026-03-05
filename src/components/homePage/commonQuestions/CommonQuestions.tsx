"use client";
import React from "react";
import QuestionAndAnswer from "./QuestionAndAnswer";

const CommonQuestions = (data : any  ) => {
 
  return (
    <QuestionAndAnswer data={data?.data}/>
  );
};

export default CommonQuestions;
