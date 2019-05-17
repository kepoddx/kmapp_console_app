import axios from "axios";
const access_token = "EAAFlOVB8mIABAES8okJZBYTUcL07UF5YiC8P17VGiQCVNLfiOZBDo6mLYNpktoqJMvFfVgJuYFf4p6rQxQkeSoyyU27Wlj4FSo2GSJYavpVwn0Hm8ZBBifEqIbeI2cCoYJSxZA03gS7q1f8ZAVlA1PIC1Bv8P53tsQ5m5TzjvCdzQZASelmObw";
axios.defaults.baseURL = "https://graph.facebook.com/v3.2";
axios.defaults.params = {};
axios.defaults.params["access_token"] = access_token;

import { from } from "rxjs";
import { map } from "rxjs/operators";

export default class FbImages {
    static addImage(account_id, imagePath) {
        return from(
            axios({
                method: "post",
                url: `${account_id}/adimages`,
                params: {
                    filename: "AG Paywall Converters.png",
                    bytes: imagePath
                }
            }).catch(err => console.error(err.response.data))
        ).pipe(map(res => JSON.stringify(res.data)));
    }
    static addAdCreative(account_id, adCreativeConfig) {
        return from(
            axios({
                method: "post",
                url: `${account_id}/adcreatives`,
                params: {
                    name: "AG Paywall Converter Image",
                    object_story_spec: {
                        page_id: "110527555449",
                        "link_data": {
                            "image_hash": "<IMAGE_HASH>",
                            "link": "https://facebook.com/110527555449",
                            "message": "try it out"
                        }

                    }
                }
            }).catch(err => handleAddImageError(err))
        ).pipe(map(res => JSON.stringify(res.data)));
    }
}

function handleAddImageError(err) {
    console.log(err.response.data.error);
    return { status: err.response.status, result: err.response.data.error };
}

// link_data: {
//     call_to_action: {
//         type: "LEARN_MORE",
//         value: { link: "http://offers.fdlreporter.com/specialoffer?gps-source=FBPWCONV" }
//     },
//     image_hash: adCreativeConfig.images.bytes.hash,
//     link: "http://offers.fdlreporter.com/specialoffer?gps-source=FBPWCONV",
//     message: "Staying connected, informed, and involved in the community is a purpose, a passion, and a big part of why we’d like you to support local journalism.  Click Learn More below to unlock exclusive and unlimited access to fdlreporter.com.",
//     description: "Keep reading and support local journalism"
// }