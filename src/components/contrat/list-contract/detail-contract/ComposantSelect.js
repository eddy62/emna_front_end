import React from "react";



const ComposantSelect = ({field, form: {touched, errors}, ...props}) => (
    <div>
        <select className=" form-control browser-default custom-select"  {...props} {...field} >
            {props.articles.map((article) =>
                <option key={article.id} value={article.id}>{article.titre + " " + article.intitule}</option>
            )}
            }
            }
        </select>
    </div>
);


export default ComposantSelect;