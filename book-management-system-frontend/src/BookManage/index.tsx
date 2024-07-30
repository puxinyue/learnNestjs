import { Button, Form, Input, Space, Table, TableColumnsType } from "antd";
import { useEffect, useRef, useState, } from "react";
import { getList } from "../api";
import MyModel from "./MyModel";

interface Book {
  handleShow: (open: boolean) => void
}

const BookManage = () => {
  const [dataSource, setDataSource] = useState([]);
  const modelRef = useRef<Book>(null)
  const columns: TableColumnsType<never> | undefined = [
    {
      title: '图书名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: '封面',
      dataIndex: 'cover',
      key: 'cover',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <Space>
          <a>编辑</a>
          <a>删除</a>
        </Space>
      )
    },
  ]
  const funGetList = async (name?: string) => {
    const res = await getList({ name })
    console.log(res)
    setDataSource(res?.data || [])
  }
  useEffect(() => {
    funGetList()
  }, [])

  return (
    <div>
      <Form layout="inline" onFinish={(values) => {
        funGetList(values?.name)
      }}>
        <Form.Item name='name' label="图书名称">
          <Input allowClear placeholder="请输入图书名称" />
        </Form.Item>
        <Space>
          <Form.Item noStyle>
            <Button htmlType="submit">
              查询
            </Button>
          </Form.Item>
          <Button type="primary" onClick={() => {
            modelRef.current?.handleShow(true)
          }}>
            新增
          </Button>
        </Space>
      </Form>
      <Table style={{ marginTop: 20 }} columns={columns} dataSource={dataSource} rowKey='id' />
      <MyModel modelRef={modelRef} />
    </div>
  )
}


export default BookManage;

function ref(arg0: null) {
  throw new Error("Function not implemented.");
}
