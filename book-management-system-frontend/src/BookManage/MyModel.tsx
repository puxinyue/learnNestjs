import { Form, Input, Modal, message } from "antd"
import { useState, useImperativeHandle } from "react"
import { bookCreate, bookUpdate } from "../api"
import Coverupload from "./Coverupload"


const MyModel = (props: any) => {
  const [isShow, setIsShow] = useState(false)
  const [currentValue, setCurrentValue] = useState<any>()

  const [form] = Form.useForm()
  useImperativeHandle(props.modelRef, () => ({
    handleShow: (open: boolean,record?:any) => {
      form.resetFields()
      setIsShow(open)
      form.setFieldsValue({...record})
      setCurrentValue(record)
    }
  }))

  const handleFinish = async() =>{
    const data =  await form.validateFields()
    if(currentValue){
      //编辑
     const resp =  await bookUpdate({...data,id: currentValue?.id})
      if(resp.status==201||resp.status==200){
        props?.funGetList()
        setIsShow(false)
        message.success('编辑成功！')
      }
    }else{
      const resp =  await bookCreate({...data})
      if(resp.status==201||resp.status==200){
        props?.funGetList()
        setIsShow(false)
        message.success('操作成功！')
      }
    }
  }
  return (
    <Modal title="新增" open={isShow} onCancel={() => setIsShow(false)} okText="确定" cancelText='取消' onOk={handleFinish} destroyOnClose>
      <Form
        form={form}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 20 }}
      >
        <Form.Item name='name' label="图书名称" rules={[{ required: true, message: '请输入' }]}>
          <Input />
        </Form.Item>
        <Form.Item name='author' label="作者" rules={[{ required: true, message: '请输入' }]}>
          <Input />
        </Form.Item>
        <Form.Item name='cover' label="封面" rules={[{ required: true, message: '请输入' }]}>
          <Coverupload />
        </Form.Item>
        <Form.Item name='description' label="描述" rules={[{ required: true, message: '请输入' }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default MyModel