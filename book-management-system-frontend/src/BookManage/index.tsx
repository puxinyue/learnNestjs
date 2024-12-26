import { Button, Form, Input, Space, Spin, Table, TableColumnsType, message } from "antd";
import { useEffect, useRef, useState, } from "react";
import { bookDelete, getList } from "../api";
import MyModel from "./MyModel";

interface Book {
  handleShow: (open: boolean,record?:any) => void
}

const BookManage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

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
          <a onClick={()=> modelRef.current?.handleShow(true,record)}>编辑</a>
          <a onClick={()=>handleDelete(record)}>删除</a>
        </Space>
      )
    },
  ]
  const funGetList = async (name?: string) => {
    setLoading(true)
    const res = await getList({ name }).finally(()=>setTimeout(()=>{setLoading(false)},500))
    console.log(res)
    setDataSource(res?.data || [])
  }
  useEffect(() => {
    funGetList()
  }, [])

  const handleDelete = async(record:any) =>{
    const data =  await bookDelete(record.id)
    if(data.status==201||data.status==200){
      funGetList()
       message.success('删除成功！')
    }
  }
  return (
    <div>
      <Spin spinning={loading}>
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
      <MyModel modelRef={modelRef} funGetList={funGetList} />
      </Spin>
    </div>
  )
}


export default BookManage;

function ref(arg0: null) {
  throw new Error("Function not implemented.");
}
