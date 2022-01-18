import {useState} from "react";

const ADMIN_MAIN_PAGE_SELECTION = () =>{
    const [notification, setNotification] = useState(true)
    const handleSave = () => {
        const contact_pref = {notification};
        fetch("url",{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(contact_pref)
        }).then(() => { console.log("success")});
    }
    return(
        <div>

            <div className='NOTIFICATION_CHECKBOX'>

                <label>E-Mail Notification</label>
                <input
                    type='checkbox'
                    checked={notification}
                    value={notification}
                    onChange={(e) => setNotification(e.currentTarget.checked)}
                />
            </div>
            <button id = 'button_big' className="SAVE_ADMIN_MAIN_PAGE"
                    onClick={handleSave}> Save
            </button>
        </div>


    )
}

export default ADMIN_MAIN_PAGE_SELECTION