
import './App.css';
import { PopUpAdd, PopUpEdit, PopUpView } from './EditModal';
import { useDeleteTaskMutation, useTasksQuery } from './services/api';


function App() {
  const { data, error, isLoading, isFetching, isSuccess } = useTasksQuery()
  const [deleteTask] = useDeleteTaskMutation()

  const deleteHandler=async(id: String)=>{
    await deleteTask(id)
  }
  return (
    <div className="App">
      {error && <h2>Something went wrong...</h2>}
      {isLoading && <h2>Loading...</h2>}
      {isFetching && <h2>Fetching...</h2>}
      {isSuccess && <table>
        <PopUpAdd/>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Status</th>
          <th>Action</th>
        
        </tr>
        {
          data.map((item) => {

            return <>

              <tr>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.completed? "Completed":"Not Completed"}</td>
                <td><button onClick={()=>deleteHandler(item.id)}>Delete</button></td>
                <td><PopUpEdit id={item.id}/></td>
                <td><PopUpView id={item.id}/></td>
              </tr>
            
            </>
          })}

      </table>}

    </div>
  );
}

export default App;
