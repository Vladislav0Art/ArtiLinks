import React, { useState, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
// contexts
import { FormContext } from '../../../contexts';
// elements
import { SelectOption } from '../../elements';
// styles
import styles from './styles.module.scss';
// images
import selectDownArrowIcon from '/public/svg/dashboard/select-down-arrow.svg';



const Select = ({ options }) => {
	const optionsRef = useRef(null);
	const iconRef = useRef(null);

	// retrieving form data from context
	const { form, handleOptionSelect } = useContext(FormContext);

	const [isVisible, setIsVisible] = useState(false);
	const [selectedOption, setSelectedOption] = useState(form.option);

	
	// toggling visibility state of options list
	const toggleOptionsVisibility = () => setIsVisible(prevState => !prevState);


	// setting option to state and closing options list
	const setOption = (option) => {
		setSelectedOption(option);
		// handling option select via form context handler
		handleOptionSelect(option);
		setIsVisible(false);
	};


	const animationTimeout = 200;

	return (
		<div className={styles.container}>
			<div className={styles.selected} onClick={toggleOptionsVisibility}>
				<span>{ selectedOption?.label }</span>

				<CSSTransition
					nodeRef={iconRef}
					in={isVisible}
					timeout={animationTimeout}
					classNames={{
						enter: styles.iconEnter,
						enterActive: styles.iconEnterActive,
						enterDone: styles.iconEnterDone,
						exit: styles.iconExit,
						exitActive: styles.iconExitActive,
						exitDone: styles.iconExitDone
					}}
				>
					<img ref={iconRef} src={selectDownArrowIcon.src} alt="Down arrow icon" />
				</CSSTransition>
			</div>

			<CSSTransition
				nodeRef={optionsRef}
				in={isVisible}
				timeout={animationTimeout}
				classNames={{
					enter: styles.optionsEnter,
					enterActive: styles.optionsEnterActive,
					enterDone: styles.optionsEnterDone,
					exit: styles.optionsExit,
					exitActive: styles.optionsExitActive,
					exitDone: styles.optionsExitDone
				}}
				mountOnEnter
				unmountOnExit
			>
				<ul ref={optionsRef} className={styles.options}>
					{
						options.map(option => (
							<SelectOption
								key={option._id}
								value={option}
								onClick={setOption}
							>
								{ option.label }
							</SelectOption>
						))
					}
				</ul>
			</CSSTransition>
		</div>
	);
};


// prop types
const requiredString = PropTypes.string.isRequired;

const optionShape = PropTypes.shape({
	_id: requiredString,
	label: requiredString
});

Select.propTypes = {
	options: PropTypes.arrayOf(optionShape).isRequired
};


export default Select;
