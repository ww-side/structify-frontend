'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { useMutation } from '@apollo/client';

import type { View } from '@/features/view/lib';
import { GET_FULL_VIEWS } from '@/features/view/services';
import { DELETE_VIEW } from '@/features/view/services/views.mutation';

import { notifySuccess } from '@/shared/lib/toast';
import { DeleteWindow } from '@/shared/ui/components/delete-window';
import {
  ArrowRightFromLine,
  Eye,
  Settings2,
  Trash2,
  useIcon,
} from '@/shared/ui/icons';
import { Chip } from '@/shared/ui/kit/chip';
import { useDialogStore } from '@/shared/ui/kit/dialog';
import { Text } from '@/shared/ui/kit/text';

import { EditView } from './edit-view';
import { ViewWidgetLayout } from './view-widget-layout';

export function View({ id, name, formats, icon }: View) {
  const Icon = useIcon(icon);
  const { registerContent, open } = useDialogStore();

  const [deleteView] = useMutation(DELETE_VIEW, {
    refetchQueries: [{ query: GET_FULL_VIEWS }],
  });

  const onDelete = useCallback(async () => {
    try {
      await deleteView({ variables: { id } });
      notifySuccess(`View ${name} deleted`);
    } catch (err) {
      console.error(err);
      notifySuccess(`Failed to delete view ${name}`);
    }
  }, [deleteView, id, name]);

  const onClickDeleteHandler = useCallback(() => {
    registerContent({
      title: 'Delete view',
      content: <DeleteWindow onDelete={onDelete} />,
    });
    open();
  }, [registerContent, onDelete, open]);

  const onClickEditHandler = useCallback(() => {
    registerContent({
      title: 'Edit view',
      content: <EditView id={id} name={name} formats={formats} icon={icon} />,
    });
    open();
  }, [registerContent, id, name, formats, icon, open]);

  return (
    <ViewWidgetLayout>
      <div className="flex justify-between mb-3">
        <div className="flex items-center gap-2">
          <button
            className="transition duration-300 ease-in-out hover:bg-gray-100 rounded-full p-1"
            onClick={onClickEditHandler}
          >
            <Settings2 size={16} />
          </button>
          <button
            className="transition duration-300 ease-in-out hover:text-danger-400 hover:bg-gray-100 rounded-full p-1"
            onClick={onClickDeleteHandler}
          >
            <Trash2 size={16} />
          </button>
        </div>
        <Link
          href={`/views/${id}`}
          className="transition duration-300 ease-in-out hover:opacity-70"
        >
          <ArrowRightFromLine size={16} />
        </Link>
      </div>
      <div className="flex items-center gap-3">
        {Icon ? <Icon size={14} /> : <Eye size={14} />}
        <Text>{name}</Text>
      </div>
      <div className="mt-3 flex items-center gap-2">
        {formats.map(format => (
          <Chip key={format} variant="flat" className="capitalize" size="sm">
            {format}
          </Chip>
        ))}
      </div>
    </ViewWidgetLayout>
  );
}
