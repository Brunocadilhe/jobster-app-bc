import { getAllJobs, hideLoading, showLoading } from '../allJobs/allJobsSlice'
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios'
import { clearValues } from './jobSlice'

export const createJobThunk = async (job, thunkAPI) => {
  try {
    const resp = await customFetch.post('/jobs', job, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    })
    thunkAPI.dispatch(clearValues())
    return resp.data
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI)
    // basic setup
    // return thunkAPI.rejectWithValue(error.response.data.msg)
    // logout user
    // <-- Before Refactoring Unauthorized Error -->
    // if (error.response.status === 401) {
    //   thunkAPI.dispatch(logoutUser())
    //   return thunkAPI.rejectWithValue('Unauthorized! Logging Out...')
    // }
    // return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const deleteJobThunk = async (jobId, thunkAPI) => {
  thunkAPI.dispatch(showLoading())
  try {
    const resp = await customFetch.delete(`/jobs/${jobId}`, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    })
    thunkAPI.dispatch(getAllJobs())
    return resp.data.msg
  } catch (error) {
    thunkAPI.dispatch(hideLoading())
    return checkForUnauthorizedResponse(error, thunkAPI)
  }
}

export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
  try {
    const resp = await customFetch.patch(`/jobs/${jobId}`, job, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    })
    thunkAPI.dispatch(clearValues())
    return resp.data
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI)
  }
}
