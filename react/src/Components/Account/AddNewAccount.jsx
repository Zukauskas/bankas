import { useState, useReducer, useEffect, useContext } from 'react';
import { Global } from '../Global';
import { useFile } from './useFile';

const nameReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: action.val.trim().length >= 3 && !/\d/.test(action.val),
    };
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value,
      isValid: state.value.trim().length >= 3 && !/\d/.test(state.value),
    };
  }
  return { value: '', isValid: undefined };
};

const lastNameReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: action.val.trim().length >= 3 && !/\d/.test(action.val),
    };
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value,
      isValid: state.value.trim().length >= 3 && !/\d/.test(state.value),
    };
  }
  return { value: '', isValid: undefined };
};

const AddNewAccount = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [file, readFile, remImage] = useFile();

  const {
    setShowModal,
    showModal,
    setNewAccount,
    newAccountModal,
    setNewAccountModal,
  } = useContext(Global);

  const [nameState, dispatchName] = useReducer(nameReducer, {
    value: '',
    isValid: undefined,
  });
  const [lastNameState, dispatchLastName] = useReducer(lastNameReducer, {
    value: '',
    isValid: undefined,
  });

  const { isValid: nameIsValid } = nameState;
  const { isValid: lastNameIsValid } = lastNameState;

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

  const dataHandler = event => {
    event.preventDefault();
    if (nameIsValid && lastNameIsValid) {
      setNewAccount({
        name: nameState.value,
        lastName: lastNameState.value,
        file,
      });
      setShowModal({
        state: 'visible',
        message: 'New account added',
        color: 'bg-green-500',
      });
      setTimeout(() => {
        setShowModal({
          state: 'hidden',
          message: '',
          color: '',
        });
      }, 2000);
      dispatchName(nameReducer, { value: '', isValid: undefined });
      dispatchLastName(lastNameReducer, {
        value: '',
        isValid: undefined,
      });
      remImage();
      setNewAccountModal(false);
    }
  };

  const cancelHandler = () => {
    setNewAccountModal(false);
    dispatchName(nameReducer, { value: '', isValid: undefined });
    dispatchLastName(lastNameReducer, {
      value: '',
      isValid: undefined,
    });
    remImage();
  };

  return (
    <>
      <div
        className={`${showModal.state} ${showModal.color} w-1/3 px-2 py-4 fixed top-1 text-center rounded-md`}>
        <p>{showModal.message}</p>
      </div>

      {newAccountModal && (
        <div className='fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center z-10'>
          <form
            onSubmit={dataHandler}
            className='flex justify-center items-center flex-col gap-4 w-full sm:w-10/12 md:w-8/12 lg:w-7/12 2xl:w-3/12 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 relative'>
            <label
              htmlFor='name'
              className={`mr-2 self-start whitespace-nowrap relative ${
                nameIsValid === false
                  ? `after:content-['Only_3_or_more_letters_are_valid'] after:block after:absolute after:left-1 after:-bottom-20 after:text-xs after:text-red-600 `
                  : ''
              }`}>
              Name
            </label>
            <input
              className={`border ${
                nameIsValid === false
                  ? 'border-red-600 bg-red-300'
                  : 'border-gray-400'
              } rounded py-2 px-4 w-full mb-3`}
              type='text'
              id='name'
              value={nameState.value}
              onChange={handleNameChange}
              onBlur={validateNameHandler}
              required
            />
            <label
              htmlFor='lastName'
              className={`mx-2 self-start whitespace-nowrap relative ${
                lastNameIsValid === false
                  ? `after:content-['Only_3_or_more_letters_are_valid'] after:block after:absolute after:-left-1 after:-bottom-20 after:text-xs after:text-red-600 `
                  : ''
              }`}>
              Last Name
            </label>
            <input
              className={`border ${
                lastNameIsValid === false
                  ? 'border-red-600 bg-red-300'
                  : 'border-gray-400'
              } rounded py-2 px-4 w-full mb-3 `}
              type='text'
              id='lastName'
              value={lastNameState.value}
              onChange={handleLastNameChange}
              onBlur={validateLastNameHandler}
              required
            />
            <label
              htmlFor='file'
              className='mx-2 self-start whitespace-nowrap relative'>
              ID:
            </label>
            <input
              type='file'
              id='file'
              className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none'
              onChange={readFile}
            />
            <div className='flex justify-center items-center flex-col gap-4 w-full'>
              {file && (
                <div className='flex justify-center items-center flex-col gap-4 w-full'>
                  <img src={file} alt='file' />
                </div>
              )}
            </div>
            <button
              className={`${
                formIsValid ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400'
              } text-white font-bold py-2 px-4 w-full rounded whitespace-nowrap`}
              type='submit'
              disabled={!formIsValid}>
              Add Account
            </button>
            <button
              className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded whitespace-nowrap right-5 w-full '
              type='button'
              onClick={cancelHandler}>
              Cancel
            </button>
          </form>
        </div>
      )}
      {!newAccountModal && (
        <button
          className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded whitespace-nowrap absolute right-5 top-20 '
          type='button'
          onClick={() => setNewAccountModal(prevState => !prevState)}>
          Add New Account
        </button>
      )}
    </>
  );
};

export default AddNewAccount;
