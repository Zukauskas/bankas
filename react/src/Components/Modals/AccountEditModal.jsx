const AccountEditModal = ({
  edit,
  editAccount,
  file,
  readFile,
  delImage,
  imgURL,
  delImg,
  cancelImage,
  modalClose,
}) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center z-10'>
      <form
        onSubmit={edit}
        className='flex justify-center items-center flex-col gap-4 w-full sm:w-10/12 md:w-8/12 lg:w-7/12 2xl:w-3/12 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 relative'>
        <label
          htmlFor='name'
          className={`mr-2 self-start whitespace-nowrap relative`}>
          Name
        </label>
        <input
          className={`border rounded py-2 px-4 w-full disabled:bg-gray-300 disabled:text-gray-500`}
          type='text'
          value={editAccount.name}
          id='name'
          disabled={true}
        />
        <label
          htmlFor='lastName'
          className={`mx-2 self-start whitespace-nowrap relative`}>
          Last Name
        </label>
        <input
          className={`border rounded py-2 px-4 w-full disabled:bg-gray-300 disabled:text-gray-500 `}
          type='text'
          value={editAccount.lastName}
          id='lastName'
          disabled={true}
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
        <div>
          {file ? (
            <img className='w-48' src={file} alt='to upload' />
          ) : editAccount.image && !delImg ? (
            <img className=' w-48' src={imgURL + editAccount.image} />
          ) : (
            <img className='w-48' src={imgURL + 'no-id.jpg'} />
          )}
        </div>
        <div className='flex gap-4'>
          <button
            className={` text-black font-bold py-2 px-4 w-full rounded whitespace-nowrap`}
            type='submit'>
            Confirm
          </button>
          <button
            className={` text-black font-bold py-2 px-4 w-full rounded whitespace-nowrap`}
            type='button'
            onClick={delImage}>
            Remove Image
          </button>
          <button
            className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded whitespace-nowrap right-5 w-full '
            type='button'
            onClick={cancelImage}>
            Abort Change
          </button>
          <button
            className=' text-black font-bold py-2 px-4 rounded whitespace-nowrap absolute top-0 right-0'
            type='button'
            onClick={modalClose}>
            X
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountEditModal;
