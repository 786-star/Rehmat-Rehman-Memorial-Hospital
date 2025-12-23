import React from 'react'
import AuthBackGroundTemplate from './components/AuthBackGroundTemplate'
import { useForm } from 'react-hook-form'
import { registerSchema, defaultValues } from '@/schema/registerSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import Heading from '@/components/Heading/Heading'
import { Form } from '@/components/ui/form'
import TextInput from '@/components/Form/Input'
import Button from '@/components/Button/Button'
import {useNavigate } from 'react-router-dom'
import { useAuth } from '@/providers/AuthProvider'
import { toast } from 'sonner'

const Register = () => {
    const { register } = useAuth()
    const navigate = useNavigate()

    const form = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues,
    })

    const onSubmit = (data) => {
        const success = register(data.userName, data.email, data.password)
        if (success) {
            toast.success('User Register successfully!')
            navigate('/login')
        } else {
            toast.error('User with this email already exists')
        }
    }

    return (
        <AuthBackGroundTemplate>
            <section className="relative p-3 flex flex-col items-center justify-center bg-transparent md:!h-[600px] w-full md:w-[70%]">
                <Heading title="Sign Up" className='!text-3xl'/>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md py-4">
                        <TextInput label='User Name' placeholder='Enter User Name' control={form.control} name="userName" />
                        <TextInput label='Email' placeholder='Enter Email' control={form.control} name="email" />
                        <TextInput 
                            label='Password' 
                            placeholder='Enter Password' 
                            control={form.control} 
                            name="password" 
                            type="password"
                        />
                        <Button type='submit' variant='blue' label={'Sign Up'} className="w-full mt-4" />
                    </form>
                </Form>
                
                <p className="mt-4 text-center">
                    Already have an account?{' '}
                    <button 
                        onClick={() => navigate('/login')}
                        className="text-blue-600 hover:underline cursor-pointer ml-1"
                    >
                        Login
                    </button>
                </p>
            </section>
        </AuthBackGroundTemplate>
    )
}

export default Register