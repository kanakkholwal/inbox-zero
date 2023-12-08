import { gmail_v1 } from "googleapis";

async function createFilter(options: {
  gmail: gmail_v1.Gmail;
  from: string;
  addLabelIds?: string[];
  removeLabelIds?: string[];
}) {
  const { gmail, from, addLabelIds, removeLabelIds } = options;

  return gmail.users.settings.filters.create({
    userId: "me",
    requestBody: {
      criteria: { from },
      action: {
        addLabelIds,
        removeLabelIds,
      },
    },
  });
}

export async function createAutoArchiveFilter(options: {
  gmail: gmail_v1.Gmail;
  from: string;
}) {
  const { gmail, from } = options;

  return createFilter({
    gmail,
    from,
    removeLabelIds: ["INBOX"],
  });
}

export async function getFiltersList(options: { gmail: gmail_v1.Gmail }) {
  return options.gmail.users.settings.filters.list({ userId: "me" });
}