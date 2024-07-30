import { Form, Input, Modal } from "antd"
import { useState, useImperativeHandle } from "react"


const MyModel = (props: any) => {
  const [isShow, setIsShow] = useState(false)

  useImperativeHandle(props.modelRef, () => ({
    handleShow: (open: boolean) => {
      setIsShow(open)
    }
  }))
  return (
    <Modal title="新增" open={isShow} onCancel={() => setIsShow(false)}>
      <Form
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
          <Input />
        </Form.Item>
        <Form.Item name='description' label="描述" rules={[{ required: true, message: '请输入' }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default MyModel