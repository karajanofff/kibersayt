import { useEffect, useState } from 'react';
import { Library, ExternalLink, FileText, Video } from 'lucide-react';
import { apiFetch } from '../api/client';
import { useTranslation } from '../context/LanguageContext';

const typeIcons = {
  hújjet: FileText,
  hujjet: FileText,
  video: Video,
  standart: Library,
  'qısqa qollanba': FileText,
  cheatsheet: FileText,
  kurs: Library,
  maqala: FileText,
};

export default function Resources() {
  const { t, getResourceTypeLabel, localizeResource } = useTranslation();
  const [resources, setResources] = useState([]);

  useEffect(() => {
    apiFetch('/api/resources').then((res) => setResources(res.data));
  }, []);

  return (
    <div>
      <h1 className="flex items-center gap-2 text-3xl font-bold text-white">
        <Library className="h-8 w-8 text-cyber-400" />
        {t('resourcesTitle')}
      </h1>
      <p className="mt-2 text-slate-400">{t('resourcesSubtitle')}</p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {resources.map((r) => {
          const item = localizeResource(r);
          const Icon = typeIcons[item.type] || FileText;
          const typeLabel = getResourceTypeLabel(item.type);
          return (
            <div key={item.id} className="card">
              <div className="flex items-start gap-3">
                <Icon className="h-6 w-6 shrink-0 text-cyber-400" />
                <div className="flex-1">
                  <span className="text-xs uppercase text-slate-500">{typeLabel}</span>
                  <h2 className="font-semibold text-white">{item.title}</h2>
                  <p className="mt-1 text-sm text-slate-400">{item.description}</p>
                  {item.url && item.url !== '#' && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-sm text-cyber-400 hover:underline"
                    >
                      {t('open')} <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
