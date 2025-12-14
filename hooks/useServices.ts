import { Service } from 'app/types';
import { useTranslations } from 'next-intl';

export const useServices = (): Service[] => {
    const t = useTranslations('services');

    return [
        {
            id: 'asesoria',
            name: t('items.asesoria.name'),
            description: t('items.asesoria.description'),},
        {
            id: 'redaccion',
            name: t('items.redaccion.name'),
            description: t('items.redaccion.description'),
        },
        {
            id: 'representacion',
            name: t('items.representacion.name'),
            description: t('items.representacion.description'),
        },
        {
            id: 'gestion',
            name: t('items.gestion.name'),
            description: t('items.gestion.description'),
        },
        {
            id: 'resolucion',
            name: t('items.resolucion.name'),
            description: t('items.resolucion.description'),
        },
    ]
};