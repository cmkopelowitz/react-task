import Form from '../components/add_user/Form';

const AddUserPage = () => {
  return (
    // No need to add the {}, you can use className="some tailwind classes here" like this
    <div className={'container mx-auto mt-3'}>
      {/* That's what I was looking for, breadkng down code into smaller
      components. Great job here! */}
      <Form />
    </div>
  );
};

export default AddUserPage;
