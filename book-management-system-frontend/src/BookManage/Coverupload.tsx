import Dragger from "antd/es/upload/Dragger"
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';

interface Myprops {
  value?:string
  onChange?:Function
}

const Coverupload = (props:Myprops) =>{
    const dragprops: UploadProps = {
        name: 'file',
        action: 'http://localhost:3000/book/upload',
        method:'post',
        onChange(info) {
          const { status } = info.file;
          if (status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            props.onChange&&props.onChange(info.file.response)
            message.success(`${info.file.name} 文件上传成功`);
          } else if (status === 'error') {
            message.error(`${info.file.name} 文件上传失败`);
          }
        },
      };
   const dragger = <Dragger {...dragprops}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibited from uploading company data or other
      banned files.
    </p>
  </Dragger>

return props?.value ? <div>
    <img src={'http://localhost:3000/' + props.value} alt="封面" width="100" height="100"/>
    {dragger}
    </div>: <div>
    {dragger}
    </div>
}

export default Coverupload