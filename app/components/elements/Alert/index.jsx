import React from 'react';
import PropTypes from 'prop-types';
// elements
import { Button } from '../../elements';
// styles
import styles from './styles.module.scss';
// icons
import WarningIcon from '/public/svg/alerts/warning-icon.svg';
import ErrorIcon from '/public/svg/alerts/error-icon.svg';



const Alert = ({
	type,
	title,
	message,
	onConfirm,
	onCancel,
}) => {

	const alertTypes = {
		info: 'info',
		warning: 'warning',
		error: 'error',
	};


	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<div className={styles.title}>
					{ type == alertTypes.error && <img alt="Error icon" src={ErrorIcon.src} /> }
					{ type == alertTypes.warning && <img alt="Warning icon" src={WarningIcon.src} /> }

					<h4>{ title }</h4>
				</div>

				{  message && <p>{ message }</p> }
			</div>

			<div className={styles.buttons}>
				{
					type === alertTypes.warning ?
						<React.Fragment>
							<Button onClick={onConfirm} modification='small'>OK</Button>
							<Button onClick={onCancel} modification='small' dark>Cancel</Button>	
						</React.Fragment>
					:
					<Button onClick={onCancel} modification='small'>OK</Button>
				}
			</div>
		</div>
	);
};


// default props
Alert.defaultProps = {
	type: 'info'
};


// prop types
const nullableString = PropTypes.oneOfType([
	PropTypes.string,
	PropTypes.oneOf([null])
]);

Alert.propTypes = {
	type: PropTypes.string,
	title: nullableString,
	message: nullableString,
	onConfirm: PropTypes.func.isRequired,
	onCancel: PropTypes.func,
};


export default Alert;
