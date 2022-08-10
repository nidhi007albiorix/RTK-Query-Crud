import { useEffect, useState } from "react";
import { useCreateTaskMutation, useTasksByIdQuery, useUpdateTaskMutation } from "./services/api";

export const PopUpEdit = ({ id }: { id: String }) => {
    const { data } = useTasksByIdQuery(id)
    const [updateTask] = useUpdateTaskMutation()
    
    // function that takes boolean as param to conditionally display popup

    const [popUpEditModal, setPopUpEditModal] = useState(false)
    const [dataAll, setDataAll] = useState<any>(data)

    const handleChange = (e: any) => {
        e.preventDefault();
        setDataAll({
            ...dataAll,
            [e.target.name]: e.target.value
        })
    }
    const handleUpdate = async () => {
        await updateTask(dataAll)
        setPopUpEditModal(false)
    }
    useEffect(() => {
        setDataAll(data)
    }, [data]);
    return (
        <>
            <button onClick={() => setPopUpEditModal(true)}>Edit</button>
            {popUpEditModal && <div className="PopUp">

                <button className="popup-x" onClick={() => setPopUpEditModal(false)} >X</button>
                <input placeholder="Title" type="text" id="title"
                    name="title"
                    value={dataAll?.title?.toString()}
                    onChange={handleChange} />
                <textarea placeholder="description" id="description" name="description" value={dataAll?.description?.toString()}    onChange={handleChange} />


                <button onClick={() => handleUpdate()}>Update</button>
            </div>}
        </>
    );
}


export const PopUpAdd = () => {

    const [createTask] = useCreateTaskMutation()
    
    // function that takes boolean as param to conditionally display popup

    const [popUpAddModal, setPopUpAddModal] = useState(false)
    const [dataAll, setDataAll] = useState<any>({})

    const handleChange = (e: any) => {
        e.preventDefault();
        setDataAll({
            ...dataAll,
            "id": Math.floor(Math.random() * 90 + 10),
            [e.target.name]: e.target.value,
            "completed":false
        })
    }
    const handleAdd = async () => {
        await createTask(dataAll)
        setPopUpAddModal(false)
        setDataAll({})
    }

    return (
        <>
            <button onClick={() => setPopUpAddModal(true)}>Add</button>
            {popUpAddModal && <div className="PopUp">

                <button className="popup-x" onClick={() => setPopUpAddModal(false)} >X</button>
                <input placeholder="Title" type="text" id="title"
                    name="title"
                    value={dataAll?.title?.toString()}
                    onChange={handleChange} />
                <textarea placeholder="description" id="description" name="description" value={dataAll?.description?.toString()}    onChange={handleChange}/>


                <button onClick={() => handleAdd()}>Add</button>
            </div>}
        </>
    );
}
export const PopUpView = ({ id }: { id: String }) => {
    const { data } = useTasksByIdQuery(id)
    const [popUpViewModal, setPopUpViewModal] = useState(false)

    return (
        <>
            <button onClick={() => setPopUpViewModal(!popUpViewModal)}>View</button>
            {popUpViewModal && <div className="PopUp">

                <button className="popup-x" onClick={() => setPopUpViewModal(!popUpViewModal)} >X</button>
                <div>

                    <h4>{data?.title}</h4>
                    <p>{data?.description}</p>
                </div>


            </div>}
        </>
    );
}
