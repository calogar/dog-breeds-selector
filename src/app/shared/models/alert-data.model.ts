/**
 * Represents the data that is used to show an alert message.
 */
export interface AlertData {
    title?: string;
    text: string;
    type: 'success' | 'error' | 'info' | 'warning';
}