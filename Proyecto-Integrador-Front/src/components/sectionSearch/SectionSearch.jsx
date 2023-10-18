import { GrFormClose, GrFormSearch } from 'react-icons/gr';
import { useState } from 'react';
import Styles from './SectionSearch.module.css';

// COMPONENTE DE LA BUSQUEDA
export const SectionSearch = ({ onSearch }) => {
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleSearch = () => {
        if (searchInput.trim() === '') {
            setHasError(true);
        } else {
            setIsSearching(true);
            setHasError(false);
            onSearch(searchInput);
        }
    };
    const clearSearch = () => {
        setSearchInput('');
        setSearchResults([]);
        setIsSearching(false);
        onSearch('');
    };
    return (
        <div className={Styles.orderSectionSearch}>
            <div className={Styles.orderSearch}>
                <input
                    list='searchValues'
                    className={`${Styles.inputSectionSearch} ${hasError ? Styles.errorInput : ''}`}
                    type="text"
                    placeholder={hasError ? "Escribe que deseas buscar ..." : "Realiza tu búsqueda..."}
                    value={searchInput}
                    onChange={(e) => {
                        setSearchInput(e.target.value);
                        setHasError(false);
                    }}
                />
                <div className={Styles.predictSearchList}>
                    <datalist id='searchValues'>
                        <option value="moto"></option>
                        <option value="jet"></option>
                        <option value="saltos"></option>
                        <option value="paramotor"></option>
                        <option value="buggie"></option>
                        <option value="lancha"></option>
                        <option value="rios"></option>
                        <option value="lagos"></option>
                        <option value="desierto"></option>
                        <option value="dunas"></option>
                        <option value="arena"></option>
                        <option value="rally"></option>
                        <option value="vuelo"></option>
                        <option value="pista"></option>
                        <option value="paseo"></option>
                    </datalist>
                </div>
                <button className={Styles.btnSectionSearch}>
                    {isSearching ? (
                        <GrFormClose className={Styles.btnnbtn} onClick={clearSearch} />
                    ) : (
                        <GrFormSearch className={Styles.btnnbtn} onClick={handleSearch} />
                    )}
                </button>
            </div>
            <div className={Styles.titleresSearch}>
                <h2>{isSearching ? `Resultados para "${searchInput}"` : 'Realiza tu búsqueda'}</h2>
                <p>Encontrá nuevas aventuras</p>
            </div>
        </div>
    )
}