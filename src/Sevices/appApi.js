import { createApi , fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const appApi = createApi({

    reducerPath: 'appApi',
    baseQuery: fetchBaseQuery({
       baseUrl: 'http://localhost:3002'
    }),

    endpoints: (bulider)=>({

        // Creating the user
        signUpUser:bulider.mutation({

            query: (user) => ({

                url:'/users',
                method:'POST',
                body:user
            })
        }),

        // Login user

        loginUser:bulider.mutation({

            query: (user)=>({

                url:'/users/login',
                method:'POST',
                body:user
            })

        }),


        // Logout User

        logoutUser:bulider.mutation({

            query: (payload)=>({

                url:'/logout',
                method:'DELETE',
                body:payload
            })

        })
    })

})


export const {useLoginUserMutation , useLogoutUserMutation, useSignUpUserMutation} = appApi

export default appApi