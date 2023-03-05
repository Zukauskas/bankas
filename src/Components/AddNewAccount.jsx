import { useState, useReducer, useEffect } from 'react';

const nameReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return {
            value: action.val,
            isValid: action.val.trim().length > 3 && !/\d/.test(action.val),
        };
    }
    if (action.type === 'INPUT_BLUR') {
        return {
            value: state.value,
            isValid: state.value.trim().length > 3 && !/\d/.test(action.value),
        };
    }
    return { value: '', isValid: undefined };
};

const lastNameReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return {
            value: action.val,
            isValid: action.val.trim().length > 3 && !/\d/.test(action.val),
        };
    }
    if (action.type === 'INPUT_BLUR') {
        return {
            value: state.value,
            isValid: state.value.trim().length > 3 && !/\d/.test(action.value),
        };
    }
    return { value: '', isValid: undefined };
};

const AddNewAccount = ({ addAccount }) => {
    const [formIsValid, setFormIsValid] = useState(false);

    const [nameState, dispatchName] = useReducer(nameReducer, {
        value: '',
        isValid: undefined,
    });
    const [lastNameState, dispatchLastName] = useReducer(lastNameReducer, {
        value: '',
        isValid: undefined,
    });

    let { isValid: nameIsValid } = nameState;
    let { isValid: lastNameIsValid } = lastNameState;

    function handleNameChange(event) {
        dispatchName({ type: 'USER_INPUT', val: event.target.value });
    }

    function handleLastNameChange(event) {
        dispatchLastName({ type: 'USER_INPUT', val: event.target.value });
    }

    const validateNameHandler = () => {
        dispatchName({ type: 'INPUT_BLUR' });
    };

    const validateLastNameHandler = () => {
        dispatchLastName({ type: 'INPUT_BLUR' });
    };

    useEffect(() => {
        const identifier = setTimeout(() => {
            setFormIsValid(nameIsValid && lastNameIsValid);
        }, 300);

        return () => {
            clearTimeout(identifier);
        };
    }, [nameIsValid, lastNameIsValid]);

    const dataHandler = (event) => {
        event.preventDefault();
        if (nameIsValid && lastNameIsValid) {
            addAccount(nameState.value, lastNameState.value);

            dispatchName(nameReducer, { value: '', isValid: undefined });
            dispatchLastName(lastNameReducer, {
                value: '',
                isValid: undefined,
            });
        }
    };

    return (
        <form
            onSubmit={dataHandler}
            className='flex justify-center items-center flex-col gap-4 w-full sm:w-10/12 md:w-8/12 lg:w-7/12 2xl:w-6/12 lg:flex-row bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 relative'
        >
            <label htmlFor='name' className='mr-2 self-start lg:self-center'>
                Name
            </label>
            <input
                className={`border ${
                    nameIsValid === false
                        ? 'border-red-600 bg-red-300'
                        : 'border-gray-400'
                } rounded py-2 px-4 w-full`}
                type='text'
                id='name'
                value={nameState.value}
                onChange={handleNameChange}
                onBlur={validateNameHandler}
                required
            />
            <label
                htmlFor='lastName'
                className='mx-2 self-start lg:self-center whitespace-nowrap'
            >
                Last Name
            </label>
            <input
                className={`border ${
                    lastNameIsValid === false
                        ? 'border-red-600 bg-red-300'
                        : 'border-gray-400'
                } rounded py-2 px-4 w-full`}
                type='text'
                id='lastName'
                value={lastNameState.value}
                onChange={handleLastNameChange}
                onBlur={validateLastNameHandler}
                required
            />
            <button
                className={`${
                    formIsValid
                        ? 'bg-blue-500 hover:bg-blue-600'
                        : 'bg-gray-400'
                } text-white font-bold py-2 px-4 w-full rounded whitespace-nowrap`}
                type='submit'
                disabled={!formIsValid}
            >
                Add Account
            </button>
        </form>
    );
};

export default AddNewAccount;
