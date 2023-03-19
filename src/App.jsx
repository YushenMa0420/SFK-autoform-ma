import dayjs from "dayjs";
import React, { useState } from "react";
import html2canvas from "html2canvas";
import Screenshot from "./Screenshot";
import "./App.css";
import sfkLogo from "./assets/SFKlogo.png";
import {
  DatePicker,
  TimePicker,
  Input,
  InputNumber,
  Descriptions,
  Select,
  Space,
  message,
} from "antd";
import { teachers, students } from "./data";

const labelStyle = {
  background: "white",
  borderLeft: "2px solid black",
  borderBottom: "2px solid black",
  textAlign: "center",
  fontWeight: 600,
  color: "black",
};
const contentStyle = {
  fontWeight: 900,
  borderLeft: "2px solid black",
  borderBottom: "2px solid black",
};
const { TextArea } = Input;

const App = () => {
  const [teacherSign, setTecherSign] = useState();
  const [studentSign, setStudemtSign] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const showMessage = (content) => {
    messageApi.open({
      type: "success",
      content: content,
    });
  };
  const downloadImg = () => {
    html2canvas(document.getElementById("studio-form")).then(function (canvas) {
      const imgData = canvas.toDataURL();
      const link = document.createElement("a");
      link.download = "image.png";
      link.href = imgData;
      link.click();
    });
    showMessage("下载成功");
  };
  const copyImgToClipboard = () => {
    html2canvas(document.getElementById("studio-form")).then(function (canvas) {
      canvas.toBlob((blob) => {
        const item = new ClipboardItem({ "image/png": blob });
        navigator.clipboard.write([item]);
      });
    });
    showMessage("图片已复制到剪贴板");
  };

  const onChangeTeacher = (value) => {
    console.log(`selected ${value}`);
    setTecherSign(value);
  };
  const onChangeStudent = (value) => {
    console.log(`selected ${value}`);
    setStudemtSign(value);
  };

  return (
    <>
      <div id="studio-form" style={{ padding: "51px" }}>
        <div className="form-title">
          <img src={sfkLogo} alt="logo" />
          <h2>Studio 课程记录表</h2>
        </div>
        <Descriptions
          size={"small"}
          labelStyle={labelStyle}
          contentStyle={contentStyle}
          column={4}
          bordered
        >
          <Descriptions.Item label="课程名称" span={4}>
            <Input bordered={false} />
          </Descriptions.Item>
          <Descriptions.Item label="上课日期">
            <DatePicker bordered={false} />
          </Descriptions.Item>
          <Descriptions.Item label="Check In">
            <TimePicker format={"HH:mm"} bordered={false} defaultValue={dayjs("10:00","HH:mm")}/>
          </Descriptions.Item>
          <Descriptions.Item label="Check Out">
            <TimePicker format={"HH:mm"} bordered={false} defaultValue={dayjs("18:00","HH:mm")}/>
          </Descriptions.Item>
          <Descriptions.Item label="确认课时数">
            <InputNumber bordered={false} defaultValue={7}/>
          </Descriptions.Item>
          <Descriptions.Item label="课程内容" span={4}>
            <TextArea rows={20} bordered={false} />
          </Descriptions.Item>
          <Descriptions.Item label="学生签字" span={4}>
            <div className="signature-container">
              {studentSign &&
                studentSign.map((imgSrc, index) => (
                  <img
                    key={index}
                    src={imgSrc}
                    alt="student signature"
                    className="teacher-sign"
                  />
                ))}
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="导师签字" span={4}>
            <div className="signature-container">
              {teacherSign && (
                <img
                  src={teacherSign}
                  alt="teacher signature"
                  className="teacher-sign"
                />
              )}
            </div>
          </Descriptions.Item>
        </Descriptions>
      </div>
      <Space>
        <Select
          onChange={onChangeStudent}
          mode="multiple"
          allowClear
          style={{ width: "40rem" }}
          placeholder="选择学生"
          options={students}
        />
        <Select
          onChange={onChangeTeacher}
          showSearch
          placeholder="选择导师"
          optionFilterProp="children"
          options={teachers}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
        />
        {contextHolder}
        <Screenshot
          downloadImg={downloadImg}
          copyImgToClipboard={copyImgToClipboard}
        />
      </Space>
    </>
  );
};
export default App;
