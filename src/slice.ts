import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export type SingleUserType = {
  data: User;
  support: {
    url: string;
    text: string;
  };
};

export type EntireData = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];

  support: {
    url: string;
    text: string;
  };
};

export type CreatedUser = {
  name: string;
  job: string;
  id?: string;
  createdAt?: string;
};

type FormValue = {
  name: string;
  job: string;
};

type MyState = {
  entireData: EntireData | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  singleUser: User | null;
  createdUsers: CreatedUser[] | [];
  formValue: FormValue;
};

const initialState: MyState = {
  entireData: null,
  status: "idle",
  error: null,
  singleUser: null,
  createdUsers: [],
  formValue: { name: "", job: "" },
};

export const fetchListUser = createAsyncThunk(
  "fetchSlice/fetchListUser",
  async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    return data; //entireData or User is returned
  }
);

export const fetchSingleUser = createAsyncThunk(
  "fetchSlice/fetchSingleUser",
  async (url: string, { rejectWithValue }) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("___Error___");
      }
      const data = await response.json();
      if (Object.keys(data).length === 0) {
        return;
      }
      return data; //entireData or User is returned
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(`${error.message}`);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const createUserThunk = createAsyncThunk<
  CreatedUser,
  string,
  { state: RootState }
>("fetchSlice/createUserThunk", async (url: string, { getState }) => {
  const {
    user: {
      formValue: { name, job },
    },
  } = getState();
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        job,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    return error;
  }
});

const mySlice = createSlice({
  name: "fetchSlice",
  initialState,
  reducers: {
    createNewUser: (state, action: PayloadAction<CreatedUser>) => {
      state.createdUsers = [...state.createdUsers, action.payload];
    },
    setFormValue: (state, action: PayloadAction<Partial<FormValue>>) => {
      state.formValue = { ...state.formValue, ...action.payload };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchListUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      fetchListUser.fulfilled,
      (state, action: PayloadAction<EntireData>) => {
        state.status = "succeeded";
        state.entireData = action.payload;
      }
    );
    builder.addCase(fetchListUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message ?? "Fetching Failed";
    });
    builder.addCase(fetchSingleUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      fetchSingleUser.fulfilled,
      (state, action: PayloadAction<SingleUserType>) => {
        state.status = "succeeded";
        state.singleUser = action.payload.data;
      }
    );
    builder.addCase(fetchSingleUser.rejected, (state, action) => {
      state.status = "failed";
      console.log(action.error);
      state.error = action.error.message ?? "Fetching Failed";
    });
    builder.addCase(createUserThunk.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      createUserThunk.fulfilled,
      (state, action: PayloadAction<CreatedUser>) => {
        state.status = "succeeded";
        state.createdUsers = [...state.createdUsers, action.payload];
        console.log("new user created", state.createdUsers);
      }
    );
    builder.addCase(createUserThunk.rejected, (state, action) => {
      state.status = "failed";
      console.log(action.error);
      state.error = action.error.message ?? "Fetching Failed";
    });
  },
});

export const { createNewUser, setFormValue } = mySlice.actions;
export default mySlice.reducer;
