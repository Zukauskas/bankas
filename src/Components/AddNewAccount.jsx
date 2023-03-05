import { useReducer } from 'react';

const initialState = {
    firstName: '',
    lastName: '',
    errors: {
        firstName: '',
        lastName: '',
    },
};

function reducer(state, action) {
    switch (action.type) {
        case 'setFirstName':
            return {
                ...state,
                firstName: action.payload,
                errors: {
                    ...state.errors,
                    firstName:
                        action.payload.trim().length < 3 ||
                        /\d/.test(action.payload)
                            ? 'Name is not valid'
                            : '',
                },
            };

        case 'setLastName':
            return {
                ...state,
                lastName: action.payload,
                errors: {
                    ...state.errors,
                    lastName:
                        action.payload.trim().length < 3 ||
                        /\d/.test(action.payload)
                            ? 'Last name is not valid'
                            : '',
                },
            };

        default:
            return state;
    }
}

const AddNewAccount = ({ addAccount }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    function handleNameChange(event) {
        dispatch({ type: 'setFirstName', payload: event.target.value });
    }

    function handleLastNameChange(event) {
        dispatch({ type: 'setLastName', payload: event.target.value });
    }

    const dataHandler = (event) => {
        event.preventDefault();
        if (!state.errors.firstName && !state.errors.lastName) {
            addAccount(state.firstName, state.lastName);
            state.firstName = '';
            state.lastName = '';
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
                className='border border-gray-400 rounded py-2 px-4 w-full'
                type='text'
                id='name'
                value={state.firstName}
                onChange={handleNameChange}
                required
            />
            {state.errors.firstName && (
                <span className='absolute text-red-500 left-0 bottom-0'>
                    {state.errors.firstName}
                </span>
            )}
            <label
                htmlFor='lastName'
                className='mx-2 self-start lg:self-center whitespace-nowrap'
            >
                Last Name
            </label>
            <input
                className='border border-gray-400 rounded py-2 px-4 w-full'
                type='text'
                id='lastName'
                value={state.lastName}
                onChange={handleLastNameChange}
                required
            />
            {state.errors.lastName && (
                <span style={{ color: 'red' }}>{state.errors.lastName}</span>
            )}
            <button
                className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 w-full rounded whitespace-nowrap'
                type='submit'
            >
                Add Account
            </button>
        </form>
    );
};

export default AddNewAccount;
