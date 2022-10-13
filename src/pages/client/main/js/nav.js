import React from "react"
import {Link} from "react-router-dom"

import ImgHover from './headerCategory'

function Nav() {
    return(
        <div>
            <nav className="nav">
                <div className="navContainer">
                    <div className="navContainer-category">
                        <ImgHover />
                    </div>

                    <div className="navContainer-subject">
                        <ul className="navContainer-subject-ul">
                            <Link to="/">
                                <li>MD추천</li>
                            </Link>
                            <Link to="/">
                                <li>타임세일</li>
                            </Link>
                            <Link to="/">
                                <li>프로모션</li>
                            </Link>
                        </ul>
                    </div>

                </div>
            </nav>
        </div>
    )
}

export default Nav;