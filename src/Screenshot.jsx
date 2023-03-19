import { DownloadOutlined, CopyOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";

const Screenshot = (props) => {
  return (
    <Space>
      <Button
        onClick={props.copyImgToClipboard}
        type="primary"
        icon={<CopyOutlined />}
      >
        截图
      </Button>
      <Button
        onClick={props.downloadImg}
        type="primary"
        icon={<DownloadOutlined />}
      >
        下载
      </Button>
    </Space>
  );
};
export default Screenshot;
