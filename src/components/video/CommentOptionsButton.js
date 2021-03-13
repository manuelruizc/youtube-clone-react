import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Delete } from '../../assets/Icons';
import { deleteComment } from '../../helpers/helpers';
import locales from '../../locales/comments';
import ButtonContainer from '../relatedvideos/ButtonContainer';
import SmallModal from '../shared/SmallModal';

const CommentOptionsButton = ({
    updateComments,
    index,
    commentId,
    comments,
}) => {
    const [isModalActive, setIsModalActive] = useState(false);
    const dispatch = useDispatch();
    const deleteUserComment = async () => {
        const response = await deleteComment(commentId);
        const { error } = response.data;
        if (!error) {
            let newComments = [...comments];
            newComments.splice(index, 1);
            updateComments([...newComments]);
            const payload = {
                toast_message: 'Comment deleted',
                id: String(new Date()) + 'deleted comment',
            };
            dispatch({ type: 'ADD_TOAST_NOTIFICATION', payload });
        }
    };
    return (
        <ButtonContainer className="btn-cnt">
            {isModalActive && (
                <SmallModal
                    right
                    style={{
                        width: '100px !important',
                        height: '36px !important',
                    }}
                    closeDropdown={() => setIsModalActive(false)}
                    autoWidth
                >
                    <div onClick={deleteUserComment} className="modal-rv-item">
                        <Delete className="icon-small-modal" />
                        <span>{locales.modal.options.delete}</span>
                    </div>
                </SmallModal>
            )}
            <a
                onClick={(e) => {
                    e.preventDefault();
                    setIsModalActive(true);
                }}
                className="btn-options"
                href="/"
            >
                <span className="three-points-toggle" />
            </a>
        </ButtonContainer>
    );
};

export default CommentOptionsButton;
