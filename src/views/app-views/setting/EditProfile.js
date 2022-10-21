import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Avatar, Button, Input, DatePicker, Row, Col, message, Upload } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ROW_GUTTER } from 'constants/ThemeConstant';
import Flex from 'components/shared-components/Flex'
import { useState } from 'react';
import Loading from 'components/shared-components/Loading'
import { useDispatch, useSelector } from 'react-redux';
import { getUploadingStatus } from 'redux/selectors';
import { actionFetchUpdateProfile, actionUpdateProfileStatus } from 'redux/actions/UsersData';
import { LoadingStatus } from 'constants/ApiConstant';
import { AppRoute } from 'configs/AppConfig';

const AVATAR_ENDPOINT = 'https://www.mocky.io/v2/5cc8019d300000980a055e76';

const stateInitial = {
	avatarUrl: '/img/avatars/thumb-6.jpg',
	name: 'Charlie Howard',
	email: 'charlie.howard@themenate.com',
	userName: 'Charlie',
	dateOfBirth: null,
	phoneNumber: '+44 (1532) 135 7921',
	website: '',
	address: '',
	city: '',
	postcode: ''
};

export const EditProfile = () => {
	const dispatch = useDispatch();
	let history = useHistory();
	
	const [state, setState] = useState(stateInitial);
	const uploadingStatus = useSelector(getUploadingStatus);
	const isPending = uploadingStatus === LoadingStatus.pending;
	const isSuccess = uploadingStatus === LoadingStatus.success;

	const getBase64 = (img, callback) => {
		const reader = new FileReader();
		reader.addEventListener('load', () => callback(reader.result));
		reader.readAsDataURL(img);
	}

	const onFinish = values => {
		dispatch(
			actionUpdateProfileStatus(LoadingStatus.pending)
		);

		dispatch(
			actionFetchUpdateProfile({
				name: values.name,
				email: values.email,
				userName: values.userName,
				dateOfBirth: values.dateOfBirth,
				phoneNumber: values.phoneNumber,
				website: values.website,
				address: values.address,
				city: values.city,
				postcode: values.postcode,
			})
		);

		if (isSuccess) {
			history.push(AppRoute.clients);
		}
	};

	const onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo);
	};

	const onUploadAavater = info => {
		const key = 'updatable';
		if (info.file.status === 'uploading') {
			message.loading({ content: 'Uploading...', key, duration: 1000 });
			return;
		}
		if (info.file.status === 'done') {
			getBase64(info.file.originFileObj, imageUrl =>
				setState((prev) => ({
					...prev,
					avatarUrl: imageUrl,
				})),
			);
			message.success({ content: 'Uploaded!', key,  duration: 1.5 });
		}
	};

	const onRemoveAvater = () => {
		setState((prev) =>  ({
			...prev,
			avatarUrl: '',
		}))
	}

	const { name, email, userName, dateOfBirth, phoneNumber, website, address, city, postcode, avatarUrl } = state;

	return (
		<>
			<Flex alignItems="center" mobileFlex={false} className="text-center text-md-left">
				<Avatar size={90} src={avatarUrl} icon={<UserOutlined />}/>
				<div className="ml-md-3 mt-md-0 mt-3">
					<Upload onChange={onUploadAavater} showUploadList={false} action={AVATAR_ENDPOINT}>
						<Button type="primary">Change Avatar</Button>
					</Upload>
					<Button className="ml-2" onClick={onRemoveAvater}>Remove</Button>
				</div>
			</Flex>
			<div className="mt-4">
				<Form
					name="basicInformation"
					layout="vertical"
					initialValues={
						{ 
							'name': name,
							'email': email,
							'username': userName,
							'dateOfBirth': dateOfBirth,
							'phoneNumber': phoneNumber,
							'website': website,
							'address': address,
							'city': city,
							'postcode': postcode
						}
					}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
				>
					<Row>
						<Col xs={24} sm={24} md={24} lg={16}>
							<Row gutter={ROW_GUTTER}>
								<Col xs={24} sm={24} md={12}>
									<Form.Item
										label="Name"
										name="name"
										rules={[
											{
												required: true,
												message: 'Please input your name!',
											},
										]}
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={12}>
									<Form.Item
										label="Username"
										name="username"
										rules={[
											{
												required: true,
												message: 'Please input your username!'
											},
										]}
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={12}>
									<Form.Item
										label="Email"
										name="email"
										rules={[{ 
											required: true,
											type: 'email',
											message: 'Please enter a valid email!' 
										}]}
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={12}>
									<Form.Item
										label="Date of Birth"
										name="dateOfBirth"
									>
										<DatePicker className="w-100"/>
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={12}>
									<Form.Item
										label="Phone Number"
										name="phoneNumber"
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={12}>
									<Form.Item
										label="Website"
										name="website"
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={24}>
									<Form.Item
										label="Address"
										name="address"
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={12}>
									<Form.Item
										label="City"
										name="city"
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={12}>
									<Form.Item
										label="Post code"
										name="postcode"
									>
										<Input />
									</Form.Item>
								</Col>
							</Row>
							<Button type="primary" htmlType="submit"  disabled={isPending}>
								{
									isPending
									?
										<div style={{display: 'Flex'}}>
											<Loading iconSize='20'/>
											<p style={{marginLeft: '20px', color: 'white'}}>Uploading Changes</p>
										</div>
									:
										'Save Change'
								}
							</Button>
						</Col>
					</Row>
				</Form>
			</div>
		</>
	)
}

export default EditProfile
