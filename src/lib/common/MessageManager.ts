export class MessageManager {
    private color: string = '';
    public toggle: boolean = false;
    public message: string = '';

    public showError(msg: string): void {
        this.toggle = true;
        this.message = msg;
        this.color = 'red';
        //   this.hideErrorAfterDelay(1000); // Hide error message after 5 seconds (adjust as needed)
    }

    public showSuccessMessage(msg: string): void {
        this.toggle = true;
        this.message = msg;
        this.color = 'green';
        //   this.hideErrorAfterDelay(1000); // Hide error message after 5 seconds (adjust as needed)
    }

    private hideErrorAfterDelay(delay: number): void {
        setTimeout(() => {
            this.hideAlerts();
        }, delay);
    }

    public hideAlerts(): void {
        this.toggle = false;
        this.message = '';
        this.color = '';
    }
}
