import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Tasks } from '../models/task.model'


export const api = createApi({
    reducerPath: "api",
    tagTypes:['Task'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/"
    }),
    endpoints: (builder) => ({
        tasks: builder.query<Tasks[], void>({
            query: () => "/tasks",
            providesTags:['Task'],
        }),
        tasksById: builder.query<Tasks, String>({
            query: (id) => `/tasks/${id}`,
            providesTags:['Task'],
        }),
        createTask: builder.mutation<void, Tasks>({
            query: task => ({ url: `/tasks`, method: 'POST', body: task }),
            invalidatesTags:['Task'],
        }),
        updateTask: builder.mutation<void, Tasks>({
            query: ({id,...rest}) => ({ url: `/tasks/${id}`, method: 'PUT', body: rest }),
            invalidatesTags:['Task'],
        }),
        deleteTask: builder.mutation<void, String>({
            query: (id) => ({ url: `/tasks/${id}`, method: 'DELETE' }),
            invalidatesTags:['Task'],
        })
    })
})
export const { useTasksQuery, useTasksByIdQuery,useCreateTaskMutation,useDeleteTaskMutation,useUpdateTaskMutation } = api