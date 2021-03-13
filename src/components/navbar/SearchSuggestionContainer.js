import React from 'react';

const SearchSuggestionContainer = (props) => {
    const { suggestions, changeCurrentSuggestionIndex } = props;

    // When selecting search suggestion with mouse
    const highlightSuggestion = (suggestionIndex) => {
        const suggestionsDOM = document.getElementsByClassName(
            'suggestion-item'
        );
        // This happens when the mouse leaves
        if (suggestionIndex === -1) changeCurrentSuggestionIndex(-1);
        // Adding or removing classes depending on the index of
        // the search suggestions selected
        for (let i = 0; i < suggestionsDOM.length; i++) {
            const currentSuggestion = suggestionsDOM[i];
            if (i === suggestionIndex) {
                changeCurrentSuggestionIndex(i);
                currentSuggestion.classList.add('suggestion-item-highlighted');
            } else
                currentSuggestion.classList.remove(
                    'suggestion-item-highlighted'
                );
        }
    };

    return (
        <div className="search-suggestion-container">
            {suggestions.map((sug, index) => {
                return (
                    <span
                        key={sug[0]}
                        onClick={(e) => props.searchSuggestion(e, sug[0])}
                        className={'suggestion-item'}
                        onMouseMove={() => highlightSuggestion(index)}
                        onMouseLeave={() => highlightSuggestion(-1)}
                    >
                        <span>{sug[0]}</span>
                    </span>
                );
            })}
        </div>
    );
};

export default SearchSuggestionContainer;
