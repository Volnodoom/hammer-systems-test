import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Card, Table, Tag, Tooltip, Button, message } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import ClientsView from './ClientsView';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import { getUserListData } from 'redux/selectors';
import { actionCloseUser, actionDeleteUser, actionShowUser } from 'redux/actions/UsersData';
import Loading from 'components/shared-components/Loading'

export const ClientsInfo = () => {
	const { users, userProfileVisible, selectedUser } = useSelector(getUserListData);
  const dispatch = useDispatch();
	const isUserDataReady = users.length > 0;
	
	const deleteUser = userId => {
		dispatch(actionDeleteUser(userId));
		message.success({ content: `Deleted user ${userId}`, duration: 2 });
	}

	const showUserProfile = userInfo => dispatch(actionShowUser(userInfo));	
	const closeUserProfile = () => dispatch(actionCloseUser());

	const tableColumns = [
		{
			title: 'User',
			dataIndex: 'name',
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus src={record.img} name={record.name} subTitle={record.email}/>
				</div>
			),
			sorter: {
				compare: (a, b) => {
					a = a.name.toLowerCase();
						b = b.name.toLowerCase();
					return a > b ? -1 : b > a ? 1 : 0;
				},
			},
		},
		{
			title: 'Role',
			dataIndex: 'role',
			sorter: {
				compare: (a, b) => a.role.length - b.role.length,
			},
		},
		{
			title: 'Last online',
			dataIndex: 'lastOnline',
			render: date => (
				<span>{moment.unix(date).format("MM/DD/YYYY")} </span>
			),
			sorter: (a, b) => moment(a.lastOnline).unix() - moment(b.lastOnline).unix()
		},
		{
			title: 'Status',
			dataIndex: 'status',
			render: status => (
				<Tag className ="text-capitalize" color={status === 'active'? 'cyan' : 'red'}>{status}</Tag>
			),
			sorter: {
				compare: (a, b) => a.status.length - b.status.length,
			},
		},
		{
			title: '',
			dataIndex: 'actions',
			render: (_, elm) => (
				<div className="text-right">
					<Tooltip title="View">
						<Button type="primary" className="mr-2" icon={<EyeOutlined />} onClick={() => {showUserProfile(elm)}} size="small"/>
					</Tooltip>
					<Tooltip title="Delete">
						<Button danger icon={<DeleteOutlined />} onClick={()=> deleteUser(elm.id)} size="small"/>
					</Tooltip>
				</div>
			)
		}
	];

	return (
		<Card bodyStyle={{'padding': '0px'}}>
			{
				isUserDataReady
				?
					<>
						<Table columns={tableColumns} dataSource={users} rowKey='id' />
						<ClientsView data={selectedUser} visible={userProfileVisible} close={()=> closeUserProfile()}/>
					</>
				:
					<Loading />
			}
		</Card>
	)
}

export default React.memo(ClientsInfo);


