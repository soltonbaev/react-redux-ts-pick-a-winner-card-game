import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {useAppDispatch} from '../../redux-store/store';

// export const deleteTodo = createAsyncThunk(
//    'todos/deleteTodo',
//    async (id: number) => {
//       const response = await axios.delete(TODOS + '/' + id);
//       console.log(response.data);
//       return id;
//    }
// );

// export const deleteTask = createAsyncThunk(
//    'tasks/deleteTasks',
//    async (id: number) => {
//       const response = await axios.delete(TASKS + '/' + id);
//       console.log(response.data);
//       return id;
//    }
// );
