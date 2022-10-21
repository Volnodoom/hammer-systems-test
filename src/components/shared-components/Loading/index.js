import React from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types'
import { LoadingOutlined } from '@ant-design/icons';

const Icon = (size) => <LoadingOutlined style={{ fontSize: size ? size : 35 }} spin />

const Loading = (props) => {
	const { align, cover } = props;
	const iconSize = props.iconSize || null;
	return (
		<div className={`loading text-${align} cover-${cover}`}>
			<Spin indicator={Icon(iconSize)} />
		</div>
	)
}

Loading.propTypes = {
	size: PropTypes.string,
	cover: PropTypes.string,
}

Loading.defaultProps = {
	align: 'center',
	cover: 'inline'
};

export default Loading