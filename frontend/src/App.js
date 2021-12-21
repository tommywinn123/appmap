import {useEffect, useState} from 'react'
import {getAllStudents} from "./client";
import {Breadcrumb, Empty, Layout, Menu, Spin, Table} from 'antd';
import {
    DesktopOutlined,
    FileOutlined,
    LoadingOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined
} from '@ant-design/icons';

import './App.css';

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'TERM',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'STATUS',
        dataIndex: 'gender',
        key: 'gender',
    },
];

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

function App() {
    const [students, setStudents] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [fetching, setFetching] = useState(true);

    const fetchStudents = () =>
        getAllStudents()
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setStudents(data);
                setFetching(false);
            })

    useEffect(() => {
        console.log("component is mounted");
        fetchStudents();
    }, []);

    const renderStudents = () => {
        if (fetching) {
            return <Spin indicator={antIcon}/>
        }
        if (students.length <= 0) {
            return <Empty/>;
        }
        return <Table
            dataSource={students}
            columns={columns}
            bordered
            title={() => 'PROJECTS'}
            pagination={{pageSize: 50}}
            scroll={{y: 240}}
        />;
    }

    return <Layout style={{minHeight: '100vh'}}>
        <Sider collapsible collapsed={collapsed}
               onCollapse={setCollapsed}>
            <div className="logo"/>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<PieChartOutlined/>}>
                    HOME
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined/>}>
                    BILLING
                </Menu.Item>
                <SubMenu key="sub1" icon={<UserOutlined/>} title="PROJECT">
                    <Menu.Item key="3">SUNCHASE</Menu.Item>
                    <Menu.Item key="4">URBAN GRID</Menu.Item>
                    <Menu.Item key="5">NOVIS</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<TeamOutlined/>} title="BILLING">
                    <Menu.Item key="6">NOVIS: POSSUM KINGDOM</Menu.Item>
                    <Menu.Item key="8">URBAN GRID: RYE </Menu.Item>
                </SubMenu>
                <Menu.Item key="9" icon={<FileOutlined/>}>
                    UPLOAD
                </Menu.Item>
            </Menu>
        </Sider>
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{padding: 0}}/>
            <Content style={{margin: '0 16px'}}>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>CLIENT</Breadcrumb.Item>
                    <Breadcrumb.Item>PROJECT</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                    {renderStudents()}
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>By Tommy Nguyen</Footer>
        </Layout>
    </Layout>
}

export default App;