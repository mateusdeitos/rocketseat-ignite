
import { Repository } from './RepositoryList';
export interface RepositoryItemProps {
    repository: Repository
}


export function RepositoryItem({ repository }: RepositoryItemProps) {
    const { name, description, html_url } = repository;
    return (
        <li>
            <strong>{name}</strong>
            <p>{description}</p>
            <a href={html_url} target="blank">Acessar repositório</a>
        </li>
    );
}