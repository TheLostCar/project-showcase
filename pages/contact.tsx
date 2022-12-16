import GlowingBorderFollowsMouse from "@components/GlowingBorderFollowsMouse";
import Layout from "@components/Layout";
import { CgSpinnerTwo, CgSpinner } from 'react-icons/cg';
import { ReactElement, useState, FormEvent } from 'react';

const Contact = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [fetchMessage, setFetchMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setFetchMessage('')
        setIsLoading(true)

        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, message })
        })
            .then(res => res.json())
            .then(res => {
                setFetchMessage(res.message);
                setMessage('');
                setEmail('');
                setIsLoading(false);
            })
    }

    return (
        <>
            <h1 className="text-4xl text-center my-5">Get in touch</h1>
            <GlowingBorderFollowsMouse className="w-[500px] h-[500px] mx-auto self-center rounded-md">
                <form className="bg-black flex flex-col h-full rounded-md" onSubmit={handleSubmit}>
                    <label htmlFor='email' className="h-[1px] w-[1px] overflow-hidden absolute whitespace-nowrap border-0 p-0">email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="email"
                        className="bg-[#262624] rounded-sm py-1 px-2 mx-3 my-3 basis-full max-h-9"
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        value={email}
                        required
                    />

                    <label htmlFor='message' className="h-[1px] w-[1px] overflow-hidden absolute whitespace-nowrap border-0 p-0">message</label>
                    <textarea
                        id='message'
                        name="message"
                        placeholder="message"
                        className="bg-[#262624] rounded-sm py-1 px-2 my-3 mx-3 basis-full"
                        onChange={(e) => setMessage(e.currentTarget.value)}
                        value={message}
                        required
                    />

                    <button
                        type="submit"
                        className="self-center px-3 py-1 my-2 rounded-sm bg-[#3b553f] hover:bg-[#397342] cursor-pointer select-none"
                        disabled={isLoading}
                    >
                        Send
                    </button>

                </form>
            </GlowingBorderFollowsMouse>
            <span className="text-center py-3" >
                {
                    isLoading
                    &&
                    <CgSpinner size={50} className='inline-block animate-[spin_.5s_linear_infinite] ' />
                    ||
                    fetchMessage
                }
            </span>
        </>
    );
}

export default Contact;

Contact.getLayout = (page: ReactElement) => (
    <Layout text='Return' href='/'>
        {page}
    </Layout>
)